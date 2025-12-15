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
               
                findProduct.quantity += action.payload.quantity || 1; 
            } else { 
             
                
                state.products.push({ 
                    ...action.payload, 
                    quantity: action.payload.quantity || 1 
                });
            }
            
            writeBasketToStorage(state.products);
        }
    }, 
});

export const { addToBasket } = basketSlice.actions

export default basketSlice.reducer