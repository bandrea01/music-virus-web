import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {SidebarComponent, TopbarComponent, useAuth} from "@components";
import "./mainPage.scss";
import {DOMAIN_FETCH_QUERY_WAIT_TIME, getTabsByRole} from "@/utils";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {getArtistList, getVenuesList} from "@pages";

export function usePrefetchBaseDomain(enabled = true) {
    const qc = useQueryClient();
    useEffect(() => {
        if (!enabled) return;

        void qc.prefetchQuery({
            queryKey: ['domain', 'artists'],
            queryFn: getArtistList,
            staleTime: DOMAIN_FETCH_QUERY_WAIT_TIME,
        });

        void qc.prefetchQuery({
            queryKey: ['domain', 'venues'],
            queryFn: getVenuesList,
            staleTime: DOMAIN_FETCH_QUERY_WAIT_TIME,
        });
    }, [qc, enabled]);
}

export default function MainPage() {
    usePrefetchBaseDomain(true);
    const {authUser} = useAuth();
    const menu = getTabsByRole(authUser?.role);

    return (
        <Box
            className="home"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    flexShrink: 0,
                    position: "sticky",
                    top: 0,
                }}
            >
                <TopbarComponent/>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flexShrink: 0,
                        display: "flex",
                        minHeight: "100%",
                        overflow: "hidden",
                    }}
                >
                    <SidebarComponent
                        menu={menu}
                    />
                </Box>

                <Box
                    component="main"
                    className="home__main-content"
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        p: 3,
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    );
}




