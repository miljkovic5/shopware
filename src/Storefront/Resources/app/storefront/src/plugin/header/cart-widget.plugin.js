import Plugin from 'src/plugin-system/plugin.class';
import HttpClient from 'src/service/http-client.service';
import Cache from 'src/helper/cache.helper';

export default class CartWidgetPlugin extends Plugin {

    static options = {
        ttl: 120000,
        // @deprecated tag:v6.7.0 - Will be removed, no more needed
        cartWidgetStorageKey: 'cart-widget-template',
        // @deprecated tag:v6.7.0 - Will be removed, no more needed
        emptyCartWidgetStorageKey: 'empty-cart-widget',
    };

    static key = 'sw-cart-cache';

    init() {
        this._client = new HttpClient();
        this.url = window.router['frontend.checkout.info'];

        this.load()

        document.$emitter.subscribe('refresh-cart-widget', () => {
            this.refresh();
        });

        document.$emitter.subscribe('store-cart-widget', (content) => {
            this.store(content);
        });
    }

    async load() {
        const self = this;

        this.el.innerHTML = await Cache.get(CartWidgetPlugin.key, this.options.ttl, function() {
            return self.fetchValue();
        });
    }

    refresh() {
        this.fetchValue().then((value) => {
            Cache.set(CartWidgetPlugin.key, this.options.ttl, value);

            this.el.innerHTML = value;
        });
    }

    fetchValue() {
        return new Promise((resolve) => {
            this._client.get(this.url, (content, response) => {
                if (response.status >= 500) {
                    return;
                }

                resolve(content);
            })
        });
    }
}
