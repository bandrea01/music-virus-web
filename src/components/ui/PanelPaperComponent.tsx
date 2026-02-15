import React, {type ReactElement, useMemo, useState} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import type {SxProps, Theme} from "@mui/material/styles";
import type {ActionProps, DropdownOption} from "@utils/types/types.ts";

export type PanelPaperComponentProps = {
  title?: string;
  subtitle?: string;
  actions?: ActionProps[];
  filtersContent?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function PanelPaperComponent({
                                              title,
                                              subtitle,
                                              actions,
                                              filtersContent,
                                              children,
                                              sx,
                                            }: PanelPaperComponentProps): ReactElement {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedByIndex, setSelectedByIndex] = useState<Record<number, string | null>>({});

  const handleOpenMenu = (index: number) => (e: React.MouseEvent<HTMLElement>) => {
    setOpenMenuIndex(index);
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuIndex(null);
    setAnchorEl(null);
  };

  const currentDropdownAction = useMemo(() => {
    if (openMenuIndex === null) return null;
    const a = actions?.[openMenuIndex];
    return a && "dropdown" in a ? a : null;
  }, [openMenuIndex, actions]);

  return (
    <Box sx={{display: "flex", flexDirection: "column", height: "100%", minHeight: 0}}>
      {
        subtitle ?
          (
            <Typography
              variant="subtitle1"
              color="white"
              fontWeight="bold"
              sx={{padding: 1, mb: 0.5}}
            >
              {subtitle}
            </Typography>
          ) :
          (
            <Typography
              variant="h5"
              color="white"
              fontWeight="bold"
              sx={{padding: 1, lineHeight: 1.2, mb: 1}}
            >
              {title}
            </Typography>
          )
      }


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
        <CardContent sx={{flex: 1, minHeight: 0, overflowY: "auto"}}>
          <Box display="flex" flexDirection="column" gap={2}>
            {actions &&
              (
                <>
                  <Box display="flex" justifyContent="end" gap={1} flexWrap="wrap">
                    {actions?.map((action, index) => {
                      // Dropdown action
                      if ("dropdown" in action) {
                        const selected = selectedByIndex[index] ?? null;
                        const selectedLabel =
                          action.dropdown?.find((o) => o.value === selected)?.label ?? null;

                        return (
                          <Button
                            key={index}
                            variant="outlined"
                            startIcon={action.startIcon}
                            onClick={handleOpenMenu(index)}
                            disabled={action.disabled}
                            sx={{textTransform: "none"}}
                          >
                            {selectedLabel ? `${action.label}: ${selectedLabel}` : action.label}
                          </Button>
                        );
                      }

                      // Button action
                      return (
                        <Button
                          key={index}
                          variant="outlined"
                          startIcon={action.startIcon}
                          onClick={action.onClick}
                          disabled={action.disabled}
                          sx={{textTransform: "none"}}
                        >
                          {action.label}
                        </Button>
                      );
                    })}
                  </Box>
                  <Menu
                    open={openMenuIndex !== null}
                    anchorEl={anchorEl}
                    onClose={handleCloseMenu}
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    transformOrigin={{vertical: "top", horizontal: "right"}}
                  >
                    {(() => {
                      if (!currentDropdownAction || openMenuIndex === null) return null;

                      const options: DropdownOption[] | undefined = currentDropdownAction.dropdown;
                      const selected = selectedByIndex[openMenuIndex] ?? null;

                      return options?.map((opt) => {
                        const isSelected = opt.value === selected;

                        return (
                          <MenuItem
                            key={opt.value}
                            selected={isSelected}
                            disabled={opt.disabled}
                            onClick={() => {
                              setSelectedByIndex((prev) => ({
                                ...prev,
                                [openMenuIndex]: opt.value
                              }));
                              currentDropdownAction?.onSelect?.(opt.value, opt);
                              handleCloseMenu();
                            }}
                            sx={
                              isSelected
                                ? {backgroundColor: "rgba(172, 96, 255, 0.15)"}
                                : undefined
                            }
                          >
                            <ListItemIcon sx={{minWidth: 32}}>
                              {isSelected ?
                                <CheckIcon fontSize="small"/> : opt.startIcon ?? null}
                            </ListItemIcon>
                            <ListItemText primary={opt.label}/>
                          </MenuItem>
                        );
                      });
                    })()}
                  </Menu>
                  {filtersContent && <Box>{filtersContent}</Box>}
                  <Divider color={"#25324a"}/>
                </>
              )
            }
            <Box>{children}</Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
    ;
}
