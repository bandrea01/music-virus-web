import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AppRoutes} from "@utils";
import {DefaultRouteManager, ProtectedRoute} from "@components";
import {
  AdminArtistPanel,
  AdminBillingPanel,
  AdminFansPanel,
  AdminGeneralPanel,
  AdminVenuePanel,
  ArtistFundraisingPanel,
  ErrorPage,
  EventPanel,
  GeneralFundraisingPanel,
  LoginPage,
  MainPage,
  PersonalProfilePanel,
  PreRegisterPage,
  RegisterPage,
  TicketPanel, TransactionPanel, VenueFundraisingPanel
} from "@pages";


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
            element={<DefaultRouteManager/>}
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
          <Route
            path={AppRoutes.SECTION.TICKET}
            element={<TicketPanel/>}
          />
          <Route
            path={AppRoutes.SECTION.TRANSACTION}
            element={<TransactionPanel/>}
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

          {/*venue*/}
          <Route
            path={AppRoutes.VENUE.PERSONAL_FUNDRAISING}
            element={<VenueFundraisingPanel/>}
          />
        </Route>

        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
