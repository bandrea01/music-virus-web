import {useState} from "react";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import {useAuth} from "@/components";
import SidebarComponent from "@components/SidebarComponent.tsx";
import TopbarComponent from "@components/TopbarComponent.tsx";
import {getTabsByRole} from "./tabsHelper.ts";
import "./homePage.scss";


export default function HomePage() {
    const [activeTab, setActiveTab] = useState<string>("");
    const {profileUser} = useAuth();

    const menu = getTabsByRole(profileUser?.role);

    console.log(menu);

    return (
        <Box className="home">
            <TopbarComponent
                profileUser={profileUser}
            />
            <SidebarComponent
                menu={menu}
                active={activeTab}
                // TODO
                setActive={setActiveTab}
            />
            <Box component="main">
                <Box className="home__main-content">
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    );
}
