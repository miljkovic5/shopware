<?php declare(strict_types=1);

namespace Shopware\Core\Framework\DataAbstractionLayer\Doctrine;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception\RetryableException;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Telemetry\Metrics\MeterProvider;
use Shopware\Core\Framework\Telemetry\Metrics\Metric\Counter;

#[Package('core')]
class RetryableTransaction
{
    /**
     * Executes the given closure inside a DBAL transaction. In case of a deadlock (RetryableException) the transaction
     * is rolled back and the closure will be retried. Because it may run multiple times the closure should not cause
     * any side effects outside its own scope.
     *
     * @template TReturn of mixed
     *
     * @param \Closure(Connection): TReturn $closure
     *
     * @return TReturn
     */
    public static function retryable(Connection $connection, \Closure $closure)
    {
        return self::retry($connection, $closure, 0);
    }

    /**
     * @template TReturn of mixed
     *
     * @param \Closure(Connection): TReturn $closure The function to execute transactionally.
     *
     * @return TReturn
     */
    private static function retry(Connection $connection, \Closure $closure, int $counter)
    {
        ++$counter;

        try {
            return $connection->transactional($closure);
        } catch (RetryableException $retryableException) {
            MeterProvider::meter()?->emit(new Counter('database.locked', 1, 'Number of database write locks'));
            if ($connection->getTransactionNestingLevel() > 0) {
                // If this RetryableTransaction was executed inside another transaction, do not retry this nested
                // transaction. Remember that the whole (outermost) transaction was already rolled back by the database
                // when any RetryableException is thrown.
                // Rethrow the exception here so only the outermost transaction is retried which in turn includes this
                // nested transaction.
                throw $retryableException;
            }

            if ($counter > 10) {
                throw $retryableException;
            }

            // Randomize sleep to prevent same execution delay for multiple statements
            usleep(random_int(10, 20));

            return self::retry($connection, $closure, $counter);
        }
    }
}
