import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {useAuth} from "@/components";
import SidebarComponent from "@components/SidebarComponent.tsx";
import TopbarComponent from "@components/TopbarComponent.tsx";
import "./mainPage.scss";
import {getTabsByRole} from "@/utils";

export default function MainPage() {
    const {profileUser} = useAuth();

    const menu = getTabsByRole(profileUser?.role);

    console.log("Profile user:", profileUser)
    console.log("Menu tabs:", menu)

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
                <TopbarComponent profileUser={profileUser} />
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
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}




