import template from './sw-extension-deactivation-modal.html.twig';
import './sw-extension-deactivation-modal.scss';

/**
 * @package checkout
 * @private
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    emits: ['modal-close', 'extension-deactivate'],

    props: {
        extensionName: {
            type: String,
            required: true,
        },
        isLicensed: {
            type: Boolean,
            required: true,
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        removeHint() {
            return this.$tc(
                'sw-extension-store.component.sw-extension-deactivation-modal.descriptionCancel',
                0,
                {
                    removeLabel: this.isLicensed ?
                        this.$tc('sw-extension-store.component.sw-extension-card-base.contextMenu.cancelAndRemoveLabel') :
                        this.$tc('sw-extension-store.component.sw-extension-card-base.contextMenu.removeLabel'),
                },
            );
        },
    },

    methods: {
        emitClose() {
            if (this.isLoading) {
                return;
            }

            this.$emit('modal-close');
        },

        emitDeactivate() {
            this.$emit('extension-deactivate');
        },
    },
};
