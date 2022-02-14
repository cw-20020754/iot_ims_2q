import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import React from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
const CustomToolbar = (props) => {
  const { t } = useTranslation();

  const StyledButton = styled(Button)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },
  }));

  return (
    <GridToolbarContainer>
      <Stack direction="row" spacing={1}>
        <StyledButton variant="text" startIcon={<AddIcon />}>
          {t("word.reg")}
        </StyledButton>
        <StyledButton
          variant="text"
          color="success"
          startIcon={<RefreshIcon />}
        >
          {t("word.refresh")}
        </StyledButton>
        <Button variant="text" color="success" startIcon={<SaveAltIcon />}>
          {t("word.download")}
        </Button>
      </Stack>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
