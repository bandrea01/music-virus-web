import React from "react";
import {Box, Button, Card, CardContent, Divider, Typography} from "@mui/material";
import type {SxProps, Theme} from "@mui/material/styles";
import type {ActionProps} from "@utils/types/types.ts";

export interface IPanelPaperComponent {
    title: string;
    actions?: ActionProps[];
    filtersContent?: React.ReactNode;
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

const PanelPaperComponent: React.FC<IPanelPaperComponent> = ({
                                                                 title,
                                                                 actions,
                                                                 filtersContent,
                                                                 children,
                                                                 sx,
                                                             }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: 0,
            }}
        >
            <Typography
                variant="h5"
                color="white"
                fontWeight="bold"
                sx={{
                    padding: 1,
                    lineHeight: 1.2,
                    mb: 1
                }}
            >
                {title}
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    ...sx,
                }}
            >
                <CardContent
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                    }}
                >
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" justifyContent="end" gap={1}>
                            {actions?.map((action, index) => (
                                <Button
                                    key={index}
                                    startIcon={action.startIcon}
                                    onClick={action.onClick}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </Box>

                        {filtersContent && (
                            <Box>
                                {filtersContent}
                            </Box>
                        )}

                        <Divider color={"#25324a"}/>

                        <Box>
                            {children}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PanelPaperComponent;
