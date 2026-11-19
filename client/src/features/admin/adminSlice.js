import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

/* Fetch all products */
export const adminFetchAllProducts = createAsyncThunk('admin/adminFetchAllProducts', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/products`);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured while fetching products")
    }
})

/* Create product */
export const adminCreateProduct = createAsyncThunk('admin/adminCreateProduct', async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/admin/products/create`, productData, config);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured while creating products")
    }
})

/* Update product */
export const adminUpdateProduct = createAsyncThunk('admin/adminUpdateProduct', async ({ id, productData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.patch(`/api/v1/admin/products/${id}`, productData, config);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured while updating product")
    }
})

/* Delete product */
export const adminDeleteProduct = createAsyncThunk('admin/adminDeleteProduct', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/products/${id}`);
        return { id, success: data.success }
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured while deleting product")
    }
})

/* Fetch all users */
export const adminFetchAllUsers = createAsyncThunk('admin/adminFetchAllUsers', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/users`);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured while fetching users")
    }
})

/* Fetch a user */
export const adminFetchUser = createAsyncThunk('admin/adminFetchUser', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/users/${id}`);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "An error occured while fetching user")
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        product: {},
        success: false,
        createProductSuccess: false,
        updateProductSuccess: false,
        deleteProductSuccess: false,
        loading: false,
        error: null,
        message: null,
        deletingId: null, // Track individual item deletion
        users: [],
        user: {}
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.createProductSuccess = false;
            state.updateProductSuccess = false;
            state.deleteProductSuccess = false;
        },
    },
    extraReducers: (builder) => {
        /* Fetch all products */
        builder
            .addCase(adminFetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminFetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
            })
            .addCase(adminFetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "An error occurred while fetching products";
            });

        /* Create product */
        builder
            .addCase(adminCreateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.createProductSuccess = false;
            })
            .addCase(adminCreateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.createProductSuccess = action.payload.success;

                if (action.payload.success) {
                    state.products.push(action.payload.product);
                }
            })
            .addCase(adminCreateProduct.rejected, (state, action) => {
                state.loading = false;
                state.createProductSuccess = false;
                state.error =
                    action.payload?.message ||
                    "An error occurred while creating products";
            });

        /* Update product */
        builder
            .addCase(adminUpdateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.updateProductSuccess = false
            })
            .addCase(adminUpdateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.updateProductSuccess = action.payload.success;

                if (action.payload.success) state.product = action.payload.product;
            })
            .addCase(adminUpdateProduct.rejected, (state, action) => {
                state.loading = false;
                state.updateProductSuccess = false;
                state.error =
                    action.payload?.message ||
                    "An error occurred while updating products";
            });

        /* Delete product */
        builder
            .addCase(adminDeleteProduct.pending, (state, action) => {
                state.deletingId = action.meta.arg; // Track which product is deleting
                state.error = null;
            })
            .addCase(adminDeleteProduct.fulfilled, (state, action) => {
                state.deletingId = null;
                state.error = null;
                state.products = state.products.filter(
                    (product) => product._id !== action.payload.id
                );
                state.deleteProductSuccess = true;
            })
            .addCase(adminDeleteProduct.rejected, (state, action) => {
                state.deletingId = null;
                state.deleteProductSuccess = false;
                state.error =
                    action.payload?.message ||
                    "An error occurred while deleting products";
            });

        /* Fetch all users */
        builder
            .addCase(adminFetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminFetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users = action.payload.users;
            })
            .addCase(adminFetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "An error occurred while fetching users";
            });

        /* Fetch a user */
        builder
            .addCase(adminFetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminFetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(adminFetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    "An error occurred while fetching user";
            });
    },
});

export const { removeErrors, removeSuccess } = adminSlice.actions;
export default adminSlice.reducer;
