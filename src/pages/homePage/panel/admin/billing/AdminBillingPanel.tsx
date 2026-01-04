import {PanelPaperComponent} from "@components";
import {Box} from "@mui/material";
import {FeeSection, TransactionSection} from "@pages";

export default function AdminBillingPanel() {

    return (
        <PanelPaperComponent
            title="Gestione Pagamenti"
        >
            <Box display="flex" gap={1} >
                <Box width="50%">
                    <FeeSection/>
                </Box>
                <Box width="50%">
                    <TransactionSection/>
                </Box>
            </Box>
        </PanelPaperComponent>
    );
}