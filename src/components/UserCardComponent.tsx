import {Avatar, Box, Button, Card, Typography} from "@mui/material";
import React from "react";

type UserCardComponentProps = {
    backgroundCardColor: string;
    borderCardColor?: string;
    avatarColor: string;
    avatarText: string;
    primaryContent: React.ReactNode;
    secondaryContent?: React.ReactNode;
    otherContent?: React.ReactNode[];
    flagsContent?: React.ReactNode[];
    actions: {
        text: string;
        onConfirm: () => void;
    }[];
}

const UserCardComponent = ({
                               backgroundCardColor,
                               borderCardColor,
                               avatarColor,
                               avatarText,
                               primaryContent,
                               secondaryContent,
                               otherContent,
                               flagsContent,
                               actions
                           }: UserCardComponentProps) => {

    return (
        <Card
            variant="outlined"
            sx={{
                bgcolor: `${backgroundCardColor} !important`,
                borderColor: `${borderCardColor} !important`,
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
                            sx={{bgcolor: avatarColor, width: 56, height: 56}}
                        >
                            {avatarText}
                        </Avatar>
                    </Box>
                    <Box display="flex" alignItems="start" gap={1}>
                        <Box display="flex" flexDirection="column">
                            <Typography fontSize="20px" color="white" fontWeight="bold">
                                {primaryContent}
                            </Typography>
                            <Typography fontSize="12px" color="#fff">
                                {secondaryContent}
                            </Typography>
                            <Box display="flex" gap={1} mt={1}>
                                {otherContent}
                            </Box>
                        </Box>
                        {flagsContent &&
                            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                                {flagsContent.map((flag, idx) => (
                                    <React.Fragment key={idx}>{flag}</React.Fragment>
                                ))}
                            </Box>
                        }
                    </Box>
                </Box>
                {actions &&
                    <Box display="flex" flexDirection="column" gap={1}>
                        {actions &&
                            <Box display="flex" flexDirection="column" gap={1}>
                                {actions.map((action, idx) => (
                                    <Button
                                        key={idx}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#4A16E686",
                                            '&:hover': {scale: 1.05, backgroundColor: "#5E0DD8A5"}
                                        }}
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

export default UserCardComponent;
