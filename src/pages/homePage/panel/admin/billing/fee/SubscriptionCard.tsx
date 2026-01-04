import {type Subscription} from "@pages";
import {Box, Icon, Typography} from "@mui/material";
import type {ReactElement} from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import '../../generalPanel/adminGeneralPanel.scss';
import {FeePeriodEnum, type FeePlanPeriodKey, formatDate} from "@utils";
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';

type SubscriptionCardProps = {
    subscription: Subscription;
    onClick?: () => void;
}

export default function SubscriptionCard({
                                             subscription,
                                             onClick,
                                         }: SubscriptionCardProps): ReactElement {
    return (
        <Box className="counterCard" onClick={onClick}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <Icon component={CurrencyExchangeIcon} sx={{fontSize: 30, color: "#fafafa"}}/>
                <Typography color="#de80ff" fontWeight="bold" fontSize="10px" sx={{whiteSpace: 'pre-line'}}>
                    {subscription.isApplicatedTo.join('\n')}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <DescriptionIcon sx={{fontSize: 20, color: "white", verticalAlign: 'middle', mr: 0.5}}/>
                    <Typography color="white" fontWeight="bold" fontSize="15px">
                        {FeePeriodEnum[subscription.feePeriod as FeePlanPeriodKey]}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <AttachMoneyIcon sx={{fontSize: 20, color: "white", verticalAlign: 'middle', mr: 0.5}}/>
                    <Typography color="white" fontWeight="bold" fontSize="15px">
                        {subscription.amount} €
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                    <DateRangeIcon sx={{fontSize: 20, color: "white", verticalAlign: 'middle', mr: 0.5}}/>
                    <Typography color="white" fontWeight="bold" fontSize="15px">
                        {formatDate(subscription.activeSince)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
