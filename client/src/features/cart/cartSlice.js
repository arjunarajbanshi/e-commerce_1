import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

/* Add items to cart: Identify product by Id */
export const addItemsToCart = createAsyncThunk('cart/addItemsToCart', async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/products/${id}`);
        return {
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].image_url,
            stock: data.product.stock,
            quantity
        };

    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured")
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        loading: false,
        error: null,
        success: false,
        message: null,
        removingId: null,
        shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {}
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeMessage: (state) => {
            state.message = null
        },
        /* not creating async function: localStorage */
        removeItemFromCart: (state, action) => {
            state.removingId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.productId !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            state.removingId = null
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
        }
    },
    extraReducers: (builder) => {

        /* Add Items to Cart */
        builder.addCase(addItemsToCart.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                const item = action.payload

                const existingItem = state.cartItems.find((i) => {
                    return i.productId === item.productId
                })

                if (existingItem) {
                    existingItem.quantity = item.quantity
                    state.message = `Updated ${item.name} quantity in the cart successfully`
                } else {
                    state.cartItems.push(item)
                    state.message = `${item.name} is added to cart successfully`
                }

                state.loading = false
                state.error = null
                state.success = true
                // console.log("Current cart items:", JSON.parse(JSON.stringify(state.cartItems)));
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Something went wrong'
            })
    }
})

export const { removeErrors, removeMessage, removeItemFromCart, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;