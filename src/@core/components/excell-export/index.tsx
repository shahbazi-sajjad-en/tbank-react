"use client";

import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

interface ExcelButtonProps extends ButtonProps {
  onExport: () => void; // تابع خروجی اکسل
  label?: string;
  width?: string | number;
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#006400", // سبز تیره
  color: "#fff",
  textTransform: "none",
  fontWeight: 500,
  fontSize:"12px",
  borderRadius: 8,
  "&:hover": {
    backgroundColor: "#004d00", 
  },
}));

const ExcelButton: React.FC<ExcelButtonProps> = ({ onExport, label = "خروجی اکسل", width = "200px", ...props }) => {
  return (
    <StyledButton
      variant="contained"
      startIcon={<FileDownloadOutlinedIcon />}
      sx={{ width }}
      onClick={onExport}
      {...props}
    >
      {label}
    </StyledButton>
  );
};

export default ExcelButton;
