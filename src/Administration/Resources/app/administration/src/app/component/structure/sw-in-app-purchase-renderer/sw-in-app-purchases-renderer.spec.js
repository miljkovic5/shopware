import 'src/app/store/in-app-purchases.store';

/**
 * @package checkout
 */
import { mount } from '@vue/test-utils';

async function createWrapper() {
    return mount(await wrapTestComponent('sw-in-app-purchases-renderer', { sync: true }), {
        global: {
            stubs: {
                'sw-modal': await wrapTestComponent('sw-modal'),
            },
            provide: {
                shortcutService: {
                    stopEventListener: () => {},
                    startEventListener: () => {},
                },
            },
        },
    });
}

describe('src/app/component/structure/sw-in-app-purchase-renderer', () => {
    let wrapper = null;

    beforeEach(async () => {
        wrapper = await createWrapper();
    });

    afterEach(() => {
        wrapper.vm.closeModal();
    });

    it('should be a Vue.js component', async () => {
        expect(wrapper.vm).toBeTruthy();
    });

    it('should render the modal when modal data is set', async () => {
        const iapEntry = {
            featureId: 'Test Feature',
        };

        Shopware.Store.get('inAppPurchase').openModal(iapEntry);

        await flushPromises();

        expect(wrapper.find('.sw-in-app-purchases-renderer').exists()).toBe(true);
        expect(wrapper.find('.sw-in-app-purchases-renderer').text()).toContain('sw-in-app-purchases.title');
    });

    it('should not render the modal when modal data is not set', () => {
        expect(wrapper.vm.modal).toBeNull();

        expect(wrapper.find('.sw-in-app-purchases-renderer').exists()).toBe(false);
    });

    it('should close the modal when closeModal method is called', async () => {
        const iapEntry = {
            featureId: 'Test Feature',
        };

        Shopware.Store.get('inAppPurchase').openModal(iapEntry);

        await flushPromises();

        await wrapper.find('.sw-modal__close').trigger('click');

        await flushPromises();

        expect(wrapper.find('.sw-in-app-purchases-renderer').exists()).toBe(false);
    });
});
