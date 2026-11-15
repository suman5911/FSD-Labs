
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Employees } from "./components/Employees";
import { Organization } from "./components/Organization";
import { Layout } from "./components/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <Navigate
                            to="/employees"
                            replace
                        />
                    }
                />

                <Route
                    path="employees"
                    element={<Employees />}
                />

                <Route
                    path="organization"
                    element={<Organization />}
                />
            </Route>
        </Routes>
    );
}

export default App;