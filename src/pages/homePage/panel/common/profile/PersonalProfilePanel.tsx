import {Box} from "@mui/material";
import {type ReactElement} from "react";
import {PanelPaperComponent} from "@components";
import {BankAccountSection, InfoSection} from "@pages";

export default function PersonalProfilePanel(): ReactElement {

    return (
        <PanelPaperComponent title="Il tuo profilo">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap={3}
              padding={2}
            >
                <BankAccountSection/>
                <InfoSection/>
            </Box>
        </PanelPaperComponent>
    );
};