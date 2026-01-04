import {type Tax} from "@pages";
import {Box, Icon, Typography} from "@mui/material";
import type {ReactElement} from "react";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import '../../generalPanel/adminGeneralPanel.scss';
import {formatDate} from "@utils";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';

type TaxCardProps = {
    tax: Tax;
    onClick?: () => void;
}

function getTaxNameLabel(taxName: string): string {
    switch (taxName) {
        case 'EVENT_TAX':
            return "Tassa sulla \nconferma dell'evento";
        default:
            return taxName;
    }
}

export default function TaxCard({
                                    tax,
                                    onClick,
                                }: TaxCardProps): ReactElement {
    return (
        <Box className="counterCard" onClick={onClick} sx={{justifyContent: 'space-between', backgroundColor: '#1f0c45'}}>
            <Box display="flex" gap={3}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <Icon component={LocalAtmIcon} sx={{fontSize: 30, color: "#fafafa"}}/>
                    <Typography color="#de80ff" fontWeight="bold" fontSize="10px" sx={{whiteSpace: 'pre-line', textAlign: 'center'}}>
                        {getTaxNameLabel(tax.taxName)}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography color={"#27783e"} fontWeight="bold" fontSize="15px">
                        {tax.percentageOnTotal.toFixed(0)} %
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
                <DateRangeIcon sx={{fontSize: 20, color: "white", verticalAlign: 'middle', mr: 0.5}}/>
                <Typography color="white" fontWeight="bold" fontSize="15px">
                    {formatDate(tax.activeSince)}
                </Typography>
            </Box>
        </Box>
    )
}
