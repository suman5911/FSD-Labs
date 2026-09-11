import "./App.css";
import employeeData from "./data/employees.json";
import { Header } from "./components/Header";
import { EmployeeDirectory } from "./components/EmployeeDirectory";
import { Footer } from "./components/Footer";
import type { Department } from "./models/employee";

const departments: Department[] = employeeData;

function App() {
    return (
        <>
            <Header />
            <EmployeeDirectory departments={departments} />
            <Footer />
        </>
    );
}

export default App;