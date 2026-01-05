import {create} from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    cart: [],
    setProducts: (products) => set({products}),
    
    // Cart Functions
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cart.find(item => item._id === product._id);
            if (existingItem) {
                return {
                    cart: state.cart.map(item => 
                        item._id === product._id 
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            }
            return {
                cart: [...state.cart, { ...product, quantity: 1 }]
            };
        });
        return { success: true, message: "Added to cart" };
    },
    
    removeFromCart: (productId) => {
        set((state) => ({
            cart: state.cart.filter(item => item._id !== productId)
        }));
        return { success: true, message: "Removed from cart" };
    },
    
    updateCartQuantity: (productId, quantity) => {
        set((state) => ({
            cart: state.cart.map(item => 
                item._id === productId 
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        }));
    },
    
    clearCart: () => {
        set({ cart: [] });
        return { success: true, message: "Cart cleared" };
    },
    
    getCartTotal: () => {
        const state = useProductStore.getState();
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    getCartCount: () => {
        const state = useProductStore.getState();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
    
    // Product CRUD Functions
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newProduct)
        })
        const data = await res.json() 
        set(( state) => ({products:[...state.products, data.data]}))
        return {success:true, message:"Product created successfully"}
        
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json() 
        set (({products:data.data})) 
    },


    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
        const data = await res.json(); 
        if (!data.success) return {success:false, message: data.message}

        set((state) => ({products: state.products.filter((p) => p._id!== pid)}));
        return {success:true, message: data.message}
    },

    updateProduct: async ( pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message}
        set((state) => ({
            products: state.products.map((p) => p._id === pid? data.data : p)
        }));
        return {success: true, message: data.message}
        
    }

        
}));