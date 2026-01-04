import {Avatar, Box, Button, Card, Typography} from "@mui/material";
import {Fragment, type ReactElement, type ReactNode} from "react";

type UserCardComponentProps = {
    backgroundCardColor: string;
    borderCardColor?: string;
    avatarColor: string;
    avatarText: string;
    primaryContent: ReactNode;
    secondaryContent?: ReactNode;
    otherContent?: ReactNode[];
    flagsContent?: ReactNode[];
    actions: {
        text: string;
        onConfirm: () => void;
        startIcon?: ReactNode;
    }[];
}

export default function UserCardComponent({
                               backgroundCardColor,
                               borderCardColor,
                               avatarColor,
                               avatarText,
                               primaryContent,
                               secondaryContent,
                               otherContent,
                               flagsContent,
                               actions
                           }: UserCardComponentProps): ReactElement {

    return (
        <Card
            variant="outlined"
            sx={{
                bgcolor: `${backgroundCardColor} !important`,
                borderColor: `${borderCardColor} !important`,
                borderWidth: "3px !important",
                padding: "20px",
                borderRadius: "15px",
                opacity: "100%",
                "&:hover": {cursorPointer: "pointer"}
            }}
        >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" gap={2}>
                    <Box>
                        <Avatar
                            sx={{bgcolor: avatarColor, width: 56, height: 56, ":hover": {cursor: "pointer", backgroundColor: '#33619e'}}}
                        >
                            {avatarText}
                        </Avatar>
                    </Box>
                    <Box display="flex" alignItems="start" width="100%" gap={1}>
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" justifyContent="space-between" gap={0.5} width="400px">
                                <Typography fontSize="20px" color="white" fontWeight="bold">
                                    {primaryContent}
                                </Typography>
                                {flagsContent &&
                                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                        {flagsContent.map((flag, idx) => (
                                            <Fragment key={idx}>{flag}</Fragment>
                                        ))}
                                    </Box>
                                }
                            </Box>
                            <Typography fontSize="12px" color="#fff">
                                {secondaryContent}
                            </Typography>
                            <Box display="flex" gap={1} mt={1}>
                                {otherContent}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {actions &&
                    <Box display="flex" flexDirection="column" gap={1}>
                        {actions &&
                            <Box display="flex" flexDirection="column" gap={1}>
                                {actions.map((action, idx) => (
                                    <Button
                                        key={idx}
                                        variant="text"
                                        sx={{
                                            color: '#fafafa',
                                            borderColor: '#fafafa',
                                            minWidth: "160px",
                                            justifyContent: "flex-start",
                                        }}
                                        startIcon={action.startIcon}
                                        onClick={action.onConfirm}
                                    >
                                        {action.text}
                                    </Button>
                                ))}
                            </Box>
                        }
                    </Box>
                }
            </Box>
        </Card>
    )
}