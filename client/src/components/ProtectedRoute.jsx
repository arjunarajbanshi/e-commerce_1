import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../features/user/userSlice";
import Loader from "./Loader";

const ProtectedRoute = ({ element, adminOnly = false }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, user, loading } = useSelector(
        (state) => state.user,
    );

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated, user]);

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (adminOnly && user.role !== "admin")
        return <Navigate to="/" replace />;

    if (loading || (isAuthenticated && !user)) return <Loader />;

    return element;
};

export default ProtectedRoute;
