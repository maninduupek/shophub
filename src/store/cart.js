import { defineStore } from 'pinia';
export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    actions: {
        addItem(product) {
            if (!this.items.find((item) => item.id === product.id)) {
                this.items.push(product);
            }
        },
        removeItem(productId) {
            this.items = this.items.filter((item) => item.id !== productId);
        }
    },
    getters: {
        itemCount: (state) => state.items.length
    }
});
//# sourceMappingURL=cart.js.map