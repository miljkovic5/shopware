import type { IapEntry } from 'src/app/store/in-app-purchases.store';
import template from './sw-in-app-purchases-renderer.html.twig';
import './sw-in-app-purchases-renderer.scss';

const { Component } = Shopware;

/**
 * @package admin
 *
 * @private
 */
// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
Component.register('sw-in-app-purchases-renderer', {
    template,

    computed: {
        modal(): IapEntry|null {
            return Shopware.Store.get('inAppPurchase').modal;
        },
    },

    methods: {
        closeModal() {
            Shopware.Store.get('inAppPurchase').closeModal();
        },
    },
});
