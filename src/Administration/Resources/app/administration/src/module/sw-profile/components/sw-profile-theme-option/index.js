import template from './sw-profile-theme-option.html.twig';
import './sw-profile-theme-option.scss';

export default {
    template,

    props: {
        label: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        selected: {
            type: Boolean,
            required: true
        },
    },
};
