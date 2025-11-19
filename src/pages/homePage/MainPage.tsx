import {useState} from "react";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {useAuth} from "@/components";
import SidebarComponent from "@components/SidebarComponent.tsx";
import TopbarComponent from "@components/TopbarComponent.tsx";
import {getTabsByRole} from "@/pages";
import "./mainPage.scss";

export default function MainPage() {
    const [activeTab, setActiveTab] = useState<string>("");
    const {profileUser} = useAuth();

    const menu = getTabsByRole(profileUser?.role);
    console.log("MENU", menu);

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
                        active={activeTab}
                        setActive={setActiveTab}
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




