// src/App.tsx
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import PreRegisterPage from "./pages/preRegisterPage/PreRegisterPage.tsx";
import MainPage from "@pages/homePage/MainPage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import PersonalProfilePanel from "./pages/homePage/panel/PersonalProfilePanel.tsx";
import ErrorPage from "@pages/ErrorPage.tsx";
import AdminArtistPanel from "@pages/homePage/panel/admin/AdminArtistPanel.tsx";
import AdminFansPanel from "@pages/homePage/panel/admin/AdminFansPanel.tsx";
import AdminVenuePanel from "@pages/homePage/panel/admin/AdminVenuePanel.tsx";
import AdminGeneralPanel from "@pages/homePage/panel/admin/adminGeneralPanel/AdminGeneralPanel.tsx";
import {MusicVirusRoutesEnum} from "@/utils";
import ProtectedRoute from "@components/context/ProtectedRoute.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={MusicVirusRoutesEnum.ROOT}
                    element={<Navigate to={MusicVirusRoutesEnum.LOGIN} replace/>}
                />

                <Route path={MusicVirusRoutesEnum.LOGIN} element={<LoginPage/>}/>
                <Route path={MusicVirusRoutesEnum.PRE_REGISTER} element={<PreRegisterPage/>}/>
                <Route path={MusicVirusRoutesEnum.REGISTER_TYPE} element={<RegisterPage/>}/>

                <Route
                    path={MusicVirusRoutesEnum.MUSIC_VIRUS}
                    element={
                        <ProtectedRoute>
                            <MainPage/>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <Navigate
                                to={MusicVirusRoutesEnum.ADMIN_GENERAL_DASHBOARD}
                                replace
                            />
                        }
                    />

                    <Route
                        path={MusicVirusRoutesEnum.ADMIN_GENERAL_DASHBOARD}
                        element={<AdminGeneralPanel/>}
                    />
                    <Route
                        path={MusicVirusRoutesEnum.ADMIN_ARTIST_MANAGEMENT}
                        element={<AdminArtistPanel/>}
                    />
                    <Route
                        path={MusicVirusRoutesEnum.ADMIN_FAN_MANAGEMENT}
                        element={<AdminFansPanel/>}
                    />
                    <Route
                        path={MusicVirusRoutesEnum.ADMIN_VENUE_MANAGEMENT}
                        element={<AdminVenuePanel/>}
                    />
                    <Route
                        path={MusicVirusRoutesEnum.PROFILE}
                        element={<PersonalProfilePanel/>}
                    />
                </Route>

                <Route
                    path={MusicVirusRoutesEnum.HOMEPAGE}
                    element={<Navigate to={MusicVirusRoutesEnum.MUSIC_VIRUS} replace/>}
                />

                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
