import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import PreRegisterPage from "./pages/preRegisterPage/PreRegisterPage.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/pre-register" element={<PreRegisterPage/>}/>
                <Route path="/register/:type" element={<RegisterPage/>}/>
                <Route path="/homepage" element={<HomePage/>}/>
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}
