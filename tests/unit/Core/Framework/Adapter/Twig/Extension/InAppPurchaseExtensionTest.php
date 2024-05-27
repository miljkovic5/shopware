<?php declare(strict_types=1);

namespace Shopware\Tests\Unit\Core\Framework\Adapter\Twig\Extension;

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use Shopware\Core\Framework\Adapter\Twig\Extension\InAppPurchaseExtension;
use Shopware\Core\Framework\Store\InAppPurchase;
use Twig\TwigFunction;

/**
 * @internal
 */
#[CoversClass(InAppPurchaseExtension::class)]
class InAppPurchaseExtensionTest extends TestCase
{
    private InAppPurchaseExtension $extension;

    protected function setUp(): void
    {
        $this->extension = new InAppPurchaseExtension();
    }

    public function testGetFunctions(): void
    {
        $functions = $this->extension->getFunctions();

        static::assertCount(2, $functions);
        static::assertInstanceOf(TwigFunction::class, $functions[0]);
        static::assertInstanceOf(TwigFunction::class, $functions[1]);
        static::assertEquals('in_app_purchase', $functions[0]->getName());
        static::assertEquals('all_in_app_purchases', $functions[1]->getName());
    }

    public function testIsActive(): void
    {
        InAppPurchase::registerPurchases(['app' => 'test']);

        static::assertTrue($this->extension->isActive('app'));
        static::assertFalse($this->extension->isActive('nonexistent'));
    }

    public function testAll(): void
    {
        InAppPurchase::registerPurchases(['app' => 'test', 'anotherapp' => 'test2']);

        static::assertEquals(['app', 'anotherapp'], $this->extension->all());
    }
}
