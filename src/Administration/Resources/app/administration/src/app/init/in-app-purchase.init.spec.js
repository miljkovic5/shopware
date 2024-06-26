/**
 * @package checkout
 */
import initializeInAppPurchase from 'src/app/init/in-app-purchase.init';
import { trigger } from '@shopware-ag/meteor-admin-sdk/es/in-app-purchases';
import 'src/app/store/in-app-purchases.store';

describe('src/app/init/in-app-purchase.init.ts', () => {
    beforeAll(() => {
        initializeInAppPurchase();
    });

    beforeEach(() => {
        Shopware.State._store.state.extensions = {};
        Shopware.State.commit('extensions/addExtension', {
            name: 'jestapp',
            baseUrl: '',
            permissions: [],
            version: '1.0.0',
            type: 'app',
            integrationId: '123',
            active: true,
        });

        Shopware.Store.get('inAppPurchase').$reset();
    });

    it('should handle incoming inAppPurchases requests', async () => {
        await trigger({
            title: 'Your purchase title',
            variant: 'default',
            showHeader: true,
            showFooter: true,
            closable: true,
        });

        expect(Shopware.Store.get('inAppPurchase').modal).toBeDefined();
    });
});
