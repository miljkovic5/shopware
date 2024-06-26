/**
 * @package admin
 */
import type { inAppPurchases } from '@shopware-ag/meteor-admin-sdk/es/in-app-purchases';

// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
export type IapEntry = Omit<inAppPurchases, 'responseType'>;

// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
export type IapState = {
    state: {
        modal: IapEntry|null,
    },
    actions: {
        openModal: (featureId: IapEntry) => void,
        closeModal: () => void,
    },
    getters: unknown,
}

Shopware.Store.register({
    id: 'inAppPurchase',

    state: (): IapState['state'] => ({
        modal: null,
    }),

    actions: {
        openModal(featureId: IapEntry) {
            this.modal = featureId;
        },

        closeModal(): void {
            this.modal = null;
        },
    },
});
