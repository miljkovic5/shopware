import template from './sw-category-view.html.twig';
import './sw-category-view.scss';

/**
 * @package inventory
 */
// eslint-disable-next-line sw-deprecation-rules/private-feature-declarations
export default {
    template,

    inject: ['acl'],

    mixins: [
        'placeholder',
    ],

    props: {
        isLoading: {
            type: Boolean,
            required: true,
            default: false,
        },
        type: {
            type: String,
            required: false,
            default: 'page',
        },
    },

    computed: {
        category() {
            return Shopware.State.get('swCategoryDetail').category;
        },

        cmsPage() {
            if (this.type === 'folder' || this.type === 'link') {
                return false;
            }

            return Shopware.Store.get('cmsPageState').currentPage;
        },

        isPage() {
            return this.type !== 'folder' && this.type !== 'link';
        },

        isCustomEntity() {
            return this.type === 'custom_entity';
        },
    },
};
