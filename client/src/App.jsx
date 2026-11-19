import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./User/Register";
import Login from "./User/Login";
import Profile from "./User/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePassword from "./User/UpdatePassword";
import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import Cart from "./Cart/Cart";
import Shipping from "./Cart/Shipping";
import OrderConfirm from "./Cart/OrderConfirm";
import Payment from "./Cart/Payment";
// import Dashboard from "./Admin/Dashboard";
import AdminLayout from "./Admin/AdminLayout";
import DashboardHome from "./Admin/DashboardHome";
import ProductsList from "./Admin/ProductsList";
import CreateProduct from "./Admin/CreateProduct";
import AdminNotFound from "./Admin/AdminNotFound";
import { UpdateProduct } from "./Admin/UpdateProduct";
import UsersList from "./Admin/UsersList";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={<ProtectedRoute element={<Profile />} />}
                />
                <Route
                    path="/password/update"
                    element={<ProtectedRoute element={<UpdatePassword />} />}
                />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/reset/:token" element={<ResetPassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/shipping"
                    element={<ProtectedRoute element={<Shipping />} />}
                />
                <Route
                    path="/order/confirm"
                    element={<ProtectedRoute element={<OrderConfirm />} />}
                />
                <Route
                    path="/process/payment"
                    element={<ProtectedRoute element={<Payment />} />}
                />

                {/* ADMIN Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            element={<AdminLayout />}
                            adminOnly={true}
                        />
                    }
                >
                    {/* Admin 404 */}
                    <Route path="*" element={<AdminNotFound />} />
                    {/* <Route index element={<DashboardHome />} /> */}
                    <Route path="overview" element={<DashboardHome />} />
                    <Route path="products" element={<ProductsList />} />
                    <Route path="products/create" element={<CreateProduct />} />
                    <Route path="products/:id" element={<UpdateProduct />} />
                    <Route path="users" element={<UsersList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
