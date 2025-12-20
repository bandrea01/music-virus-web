import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box, Divider} from "@mui/material";
import EventSection from "./EventSection.tsx";

const EventPanel = () => {


    return(
        <PanelPaperComponent title="Eventi">
            <Box display="flex" gap={1}>
                <Box width="50%">
                    <EventSection />
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box width="50%">
                    Mappa
                </Box>
            </Box>
        </PanelPaperComponent>
    )
}

export default EventPanel;