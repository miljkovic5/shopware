import type { InAppPurchaseRequest } from '../../../store/in-app-purchase-checkout.store';
import template from './sw-in-app-purchase-checkout.html.twig';

const { Component } = Shopware;

/**
 * @package admin
 *
 * @private
 */
// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
Component.register('sw-in-app-purchase-checkout', {
    template,

    computed: {
        entry(): InAppPurchaseRequest|null {
            return Shopware.Store.get('inAppPurchaseCheckout').entry;
        },
    },

    methods: {
        closeModal() {
            Shopware.Store.get('inAppPurchaseCheckout').dismiss();
        },
    },
});
