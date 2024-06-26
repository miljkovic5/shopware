import './in-app-purchases.store';

describe('src/app/store/in-app-purchases.store.ts', () => {
    let store = null;
    beforeEach(() => {
        store = Shopware.Store.get('inAppPurchase');
    });

    it('should open the modal with the correct data', () => {
        const iapEntry = {
            featureId: 'Test Feature',
        };

        store.openModal(iapEntry);

        expect(store.modal).toEqual(iapEntry);
    });

    it('should close the modal', () => {
        store.closeModal();

        expect(store.modal).toBeNull();
    });
});
