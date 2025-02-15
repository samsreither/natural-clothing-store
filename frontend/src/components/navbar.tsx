import { Link } from "react-router-dom";

export const Navbar = () => {
    return <div>
        <div className="navbar-title">
            <h1> Natural Clothing Store </h1>
        </div>

        <div className="navbar-links">
            <Link to="/"> Shop </Link>
            <Link to="/purchased-items"> Purchases </Link>
            <Link to="/checkout"> Cart </Link>
            <Link to="/auth"> Logout </Link>
        </div>
    </div>
}