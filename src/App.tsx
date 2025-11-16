import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import PreRegisterPage from "./pages/preRegisterPage/PreRegisterPage.tsx";
import MainPage from "@pages/homePage/MainPage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import PersonalProfilePanel from "./pages/homePage/panel/PersonalProfilePanel.tsx";
import ErrorPage from "@pages/ErrorPage.tsx";
import AdminArtistPanel from "@pages/homePage/panel/admin/AdminArtistPanel.tsx";
import AdminFansPanel from "@pages/homePage/panel/admin/AdminFansPanel.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/pre-register" element={<PreRegisterPage/>}/>
                <Route path="/register/:type" element={<RegisterPage/>}/>
                <Route path="/" element={<MainPage/>}>
                    <Route index element={<Navigate to="admin-artist-management" replace/>}/>
                    <Route path="admin-artist-management" element={<AdminArtistPanel/>}/>
                    <Route path="admin-fan-management" element={<AdminFansPanel/>}/>
                    <Route path="profile" element={<PersonalProfilePanel/>}/>
                </Route>

                <Route path="/homepage" element={<Navigate to="/" replace/>} />
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
