import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "@pages/loginPage/LoginPage.tsx";
import PreRegisterPage from "@pages/preRegisterPage/PreRegisterPage.tsx";
import MainPage from "@pages/homePage/MainPage.tsx";
import RegisterPage from "@pages/registerPage/RegisterPage.tsx";
import PersonalProfilePanel from "@pages/homePage/panel/common/profile/PersonalProfilePanel.tsx";
import ErrorPage from "@pages/ErrorPage.tsx";
import AdminArtistPanel from "@pages/homePage/panel/admin/AdminArtistPanel.tsx";
import AdminFansPanel from "@pages/homePage/panel/admin/AdminFansPanel.tsx";
import AdminVenuePanel from "@pages/homePage/panel/admin/AdminVenuePanel.tsx";
import AdminGeneralPanel from "@pages/homePage/panel/admin/generalPanel/AdminGeneralPanel.tsx";
import ProtectedRoute from "@components/providers/ProtectedRoute.tsx";
import DefaultRouteManager from "@components/providers/DefaultRouteManager.tsx";
import GeneralFundraisingPanel from "@pages/homePage/panel/common/fundraising/GeneralFundraisingPanel.tsx";
import ArtistFundraisingPanel from "@pages/homePage/panel/artist/fundraising/ArtistFundraisingPanel.tsx";
import {AppRoutes} from "@utils";
import EventPanel from "@pages/homePage/panel/common/event/EventPanel.tsx";
import {AdminBillingPanel} from "@pages";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={AppRoutes.ROOT}
                    element={<Navigate to={AppRoutes.LOGIN} replace/>}
                />

                <Route path={AppRoutes.LOGIN} element={<LoginPage/>}/>
                <Route path={AppRoutes.PRE_REGISTER} element={<PreRegisterPage/>}/>
                <Route path={AppRoutes.REGISTER.TYPE} element={<RegisterPage/>}/>

                <Route
                    path={AppRoutes.MUSIC_VIRUS}
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
                        path={AppRoutes.SECTION.PROFILE}
                        element={<PersonalProfilePanel/>}
                    />
                    <Route
                        path={AppRoutes.SECTION.FUNDRAISING}
                        element={<GeneralFundraisingPanel/>}
                    />
                    <Route
                        path={AppRoutes.SECTION.EVENT}
                        element={<EventPanel/>}
                    />

                    {/*admin*/}
                    <Route
                        path={AppRoutes.ADMIN.GENERAL_DASHBOARD}
                        element={<AdminGeneralPanel/>}
                    />
                    <Route
                        path={AppRoutes.ADMIN.ARTIST_MANAGEMENT}
                        element={<AdminArtistPanel/>}
                    />
                    <Route
                        path={AppRoutes.ADMIN.FAN_MANAGEMENT}
                        element={<AdminFansPanel/>}
                    />
                    <Route
                        path={AppRoutes.ADMIN.VENUE_MANAGEMENT}
                        element={<AdminVenuePanel/>}
                    />
                    <Route
                        path={AppRoutes.ADMIN.PAYMENTS_MANAGEMENT}
                        element={<AdminBillingPanel/>}
                    />

                    {/*artist*/}
                    <Route
                        path={AppRoutes.ARTIST.PERSONAL_FUNDRAISING}
                        element={<ArtistFundraisingPanel/>}
                    />
                </Route>

                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
