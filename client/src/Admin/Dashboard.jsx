import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import {
    MdDashboard,
    MdInventory,
    MdAddBox,
    MdPeople,
    MdShoppingCart,
    MdStar,
    MdAttachMoney,
    MdError,
    MdCheckCircle,
} from "react-icons/md";
import { FaInstagramSquare, FaLinkedin, FaYoutube } from "react-icons/fa";

const Dashboard = () => {
    return (
        <>
            <PageTitle title="Admin Dashboard" />
            <div>
                {/* sidebar  */}
                <div>
                    {/* logo icon  */}
                    <div>
                        <MdDashboard />
                        <span>Admin Dashboard</span>
                    </div>
                    <nav>
                        <div>
                            <h3>Products</h3>
                            <Link to="/admin/products">
                                <MdInventory />
                                All Products
                            </Link>
                            <Link to="/admin/products/create">
                                <MdAddBox />
                                Create Product
                            </Link>
                        </div>
                        <div>
                            <h3>Users</h3>
                            <Link to="/admin/users">
                                <MdPeople />
                                All Users
                            </Link>
                        </div>
                        <div>
                            <h3>Orders</h3>
                            <Link to="/admin/orders">
                                <MdShoppingCart />
                                All Orders
                            </Link>
                        </div>
                        <div>
                            <h3>Reviews</h3>
                            <Link to="/admin/reviewId">
                                <MdStar />
                                All Reviews
                            </Link>
                        </div>
                    </nav>
                </div>
                {/* main */}
                <div>
                    {/* stats */}
                    <div>
                        <div>
                            <MdInventory />
                            <h3>Total Products</h3>
                            <p>4</p>
                        </div>
                        <div>
                            <MdShoppingCart />
                            <h3>Total Orders</h3>
                            <p>4</p>
                        </div>
                        <div>
                            <MdStar />
                            <h3>Total Reviews</h3>
                            <p>4</p>
                        </div>
                        <div>
                            <MdInventory />
                            <h3>Total Products</h3>
                            <p>4</p>
                        </div>
                        <div>
                            <MdAttachMoney />
                            <h3>Total Revenue</h3>
                            <p>4023</p>
                        </div>
                        <div>
                            <MdError />
                            <h3>Out of Stock</h3>
                            <p>4</p>
                        </div>
                        <div>
                            <MdCheckCircle />
                            <h3>In Stock</h3>
                            <p>4</p>
                        </div>
                    </div>
                    {/* social */}
                    <div>
                        <div>
                            <FaInstagramSquare />
                            <h3>Instagram</h3>
                            <p>12K Followers</p>
                            <p>22 Posts</p>
                        </div>
                        <div>
                            <FaLinkedin />
                            <h3>Linkedin</h3>
                            <p>8K Followers</p>
                            <p>22 Posts</p>
                        </div>
                        <div>
                            <FaYoutube />
                            <h3>Youtube</h3>
                            <p>8K Subscribers</p>
                            <p>10 videos</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
