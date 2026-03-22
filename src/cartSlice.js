import { createSlice } from '@reduxjs/toolkit';

// פונקציית עזר לטעינה ראשונית - מונעת קריסה אם ה-JSON לא תקין
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('my_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        return [];
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(), // טעינה בטוחה
        isOpen: false,
    },
    reducers: {
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        addToCart: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                // שינוי כמות אם המוצר כבר קיים
                state.items[itemIndex].quantity += (action.payload.quantity || 1);
            } else {
                // הוספת מוצר חדש עם כמות (ברירת מחדל 1)
                state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
            }
            // עדכון ה-Storage
            localStorage.setItem('my_cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, amount } = action.payload;
            const item = state.items.find((i) => i.id === id);
            
            if (item) {
                item.quantity += amount;
                if (item.quantity <= 0) {
                    state.items = state.items.filter((i) => i.id !== id);
                }
            }
            // עדכון ה-Storage
            localStorage.setItem('my_cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('my_cart');
        },
    },
});

export const { toggleCart, addToCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;