/**
 * @package core
 *
 * @private
 */
export default function initializeInAppPurchaseCheckout(): void {
    Shopware.ExtensionAPI.handle('iapCheckout', (entry, { _event_ }) => {
        const extension = Object.values(Shopware.State.get('extensions'))
            .find(ext => ext.baseUrl.startsWith(_event_.origin));

        if (!extension) {
            throw new Error(`Extension with the origin "${_event_.origin}" not found.`);
        }

        const store = Shopware.Store.get('inAppPurchaseCheckout');
        store.request(entry, extension);
    });
}
