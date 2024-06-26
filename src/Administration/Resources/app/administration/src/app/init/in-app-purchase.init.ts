/**
 * @package core
 *
 * @private
 */
export default function initializeInAppPurchase(): void {
    Shopware.ExtensionAPI.handle('inAppPurchases', (inAppPurchaseConfig, { _event_ }) => {
        const extension = Object.values(Shopware.State.get('extensions'))
            .find(ext => ext.baseUrl.startsWith(_event_.origin));

        if (!extension) {
            throw new Error(`Extension with the origin "${_event_.origin}" not found.`);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const store = Shopware.Store.get('inAppPurchase');
        store.openModal(inAppPurchaseConfig);
    });
}
