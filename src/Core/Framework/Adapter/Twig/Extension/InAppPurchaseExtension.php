<?php declare(strict_types=1);

namespace Shopware\Core\Framework\Adapter\Twig\Extension;

use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Store\InAppPurchase;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

#[Package('checkout')]
class InAppPurchaseExtension extends AbstractExtension
{
    /**
     * @return TwigFunction[]
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('in_app_purchase', $this->isActive(...)),
            new TwigFunction('all_in_app_purchases', $this->all(...)),
        ];
    }

    public function isActive(string $identifier): bool
    {
        return InAppPurchase::isActive($identifier);
    }

    /**
     * @return string[]
     */
    public function all(): array
    {
        return InAppPurchase::all();
    }
}
