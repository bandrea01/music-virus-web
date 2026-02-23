import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SidebarComponent, TopbarComponent, useAuth } from "@components";
import "./mainPage.scss";
import { DOMAIN_FETCH_QUERY_WAIT_TIME, getTabsByRole } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getArtistList, getVenuesList } from "@pages";

export function usePrefetchBaseDomain(enabled = true) {
  const qc = useQueryClient();
  useEffect(() => {
    if (!enabled) return;

    void qc.prefetchQuery({
      queryKey: ["domain", "artists"],
      queryFn: getArtistList,
      staleTime: DOMAIN_FETCH_QUERY_WAIT_TIME,
    });

    void qc.prefetchQuery({
      queryKey: ["domain", "venues"],
      queryFn: getVenuesList,
      staleTime: DOMAIN_FETCH_QUERY_WAIT_TIME,
    });
  }, [qc, enabled]);
}

export default function MainPage() {
  usePrefetchBaseDomain(true);
  const { authUser } = useAuth();
  const menu = getTabsByRole(authUser?.role);

  return (
    <Box
      className="home"
      sx={{
        minHeight: "100vh",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "300px minmax(0, 1fr)",
        gridTemplateRows: "64px minmax(0, 1fr)",
        gridTemplateAreas: `
          "header header"
          "sidebar main"
        `,
        overflow: "hidden",
      }}
    >
      <Box
        className="home__header"
        sx={{
          gridArea: "header",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          minWidth: 0,
        }}
      >
        <TopbarComponent />
      </Box>

      <Box
        className="home__sidebar"
        sx={{
          gridArea: "sidebar",
          minWidth: 0,
          minHeight: "100%",
          overflow: "hidden",
        }}
      >
        <SidebarComponent menu={menu} />
      </Box>

      <Box
        component="main"
        className="home__main-content"
        sx={{
          gridArea: "main",
          minWidth: 0,
          minHeight: 0,
          overflowY: "auto",
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}