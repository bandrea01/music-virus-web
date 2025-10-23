import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import PreRegisterPage from "./pages/preRegisterPage/PreRegisterPage.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import PersonalProfilePanel from "./pages/homePage/panel/PersonalProfilePanel.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/pre-register" element={<PreRegisterPage/>}/>
                <Route path="/register/:type" element={<RegisterPage/>}/>
                <Route path="/" element={<HomePage/>}>
                    <Route index element={<Navigate to="dashboard" replace/>}/>
                    <Route path="dashboard" element={<></>}/>
                    <Route path="profile" element={<PersonalProfilePanel/>}/>
                </Route>

                <Route path="/homepage" element={<Navigate to="/" replace/>} />
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}
