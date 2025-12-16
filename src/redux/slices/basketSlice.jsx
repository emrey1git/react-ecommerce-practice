import { createSlice } from '@reduxjs/toolkit'


const getBasketFromStorage = () => { 
    
    if (typeof window !== 'undefined' && localStorage.getItem("basket")) {
        try {
            return JSON.parse(localStorage.getItem("basket"));
        } catch (e) {
            console.error("Local storage'dan sepet okunurken hata oluştu:", e);
            return [];
        }
    }
    return [];
}


const writeBasketToStorage = (basket) => { 
    if (typeof window !== 'undefined') {
        localStorage.setItem("basket", JSON.stringify(basket));
    }
}

const initialState = {
    // Sepeti başlangıçta storage'dan yükle
    products: getBasketFromStorage(),
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    
    reducers: {
        addToBasket: (state, action) => {
            
            const findProduct = state.products.find(
                (product) => product.id === action.payload.id
            );
            
            if (findProduct) {
                // Ürün zaten varsa: Miktarı artır
                findProduct.quantity += action.payload.quantity || 1; 
            } else { 
                // Ürün yoksa: Yeni ürünü 'products' array'ine ekle.
                state.products.push({ 
                    ...action.payload, 
                    quantity: action.payload.quantity || 1 
                });
            }
            
            writeBasketToStorage(state.products);
        },
        
        removeFromBasket: (state, action) => {
            const productIdToRemove = action.payload; 
            
            // products array'ini filtreleyerek ID'si eşleşmeyenleri tut
            state.products = state.products.filter(
                (product) => product.id !== productIdToRemove
            );
            
            // LocalStorage'ı güncelle
            writeBasketToStorage(state.products); 
        } 
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions 

export default basketSlice.reducer