import { NavLink } from "react-router-dom";

export function Nav() {
    return (
        <nav className="site-nav">
            <NavLink to="/employees">
                Employees
            </NavLink>

            <NavLink to="/organization">
                Organization
            </NavLink>
        </nav>
    );
}