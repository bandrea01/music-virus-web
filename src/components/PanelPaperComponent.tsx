import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import type {SxProps, Theme} from "@mui/material/styles";

export interface IPanelPaperComponent {
    title: string;
    children?: React.ReactNode;
    sx?: SxProps<Theme>; // stile extra per la Card
}

const PanelPaperComponent: React.FC<IPanelPaperComponent> = ({
                                                                 title,
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
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
};

export default PanelPaperComponent;
