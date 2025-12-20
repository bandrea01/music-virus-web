import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import PreRegisterPage from "./pages/preRegisterPage/PreRegisterPage.tsx";
import MainPage from "@pages/homePage/MainPage.tsx";
import RegisterPage from "./pages/registerPage/RegisterPage.tsx";
import PersonalProfilePanel from "@pages/homePage/panel/common/profile/PersonalProfilePanel.tsx";
import ErrorPage from "@pages/ErrorPage.tsx";
import AdminArtistPanel from "@pages/homePage/panel/admin/AdminArtistPanel.tsx";
import AdminFansPanel from "@pages/homePage/panel/admin/AdminFansPanel.tsx";
import AdminVenuePanel from "@pages/homePage/panel/admin/AdminVenuePanel.tsx";
import AdminGeneralPanel from "@pages/homePage/panel/admin/adminGeneralPanel/AdminGeneralPanel.tsx";
import {MusicVirusRoutesEnum} from "@/utils";
import ProtectedRoute from "@components/context/ProtectedRoute.tsx";
import DefaultRouteManager from "@components/context/DefaultRouteManager.tsx";
import GeneralFundraisingPanel from "@pages/homePage/panel/common/fundraising/GeneralFundraisingPanel.tsx";
import EventPanel from "@pages/homePage/panel/common/event/EventPanel.tsx";
import ArtistFundraisingPanel from "@pages/homePage/panel/artist/fundraising/ArtistFundraisingPanel.tsx";
import {usePrefetchBaseDomain} from "@main.tsx";

export default function App() {
    usePrefetchBaseDomain(true);
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
                    {/*Default route manager to redirect based on role*/}
                    <Route
                        index
                        element={<DefaultRouteManager />}
                    />

                    {/*common*/}
                    <Route
                        path={MusicVirusRoutesEnum.PROFILE}
                        element={<PersonalProfilePanel/>}
                    />
                    <Route
                        path={MusicVirusRoutesEnum.FUNDRAISING}
                        element={<GeneralFundraisingPanel/>}
                    />
                    <Route
                        path={MusicVirusRoutesEnum.EVENT}
                        element={<EventPanel/>}
                    />

                    {/*admin*/}
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

                    {/*artist*/}
                    <Route
                        path={MusicVirusRoutesEnum.ARTIST_PERSONAL_FUNDRAISING}
                        element={<ArtistFundraisingPanel/>}
                    />
                </Route>

                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
