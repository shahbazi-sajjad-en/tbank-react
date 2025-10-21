"use client";

import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

interface StyledTextFieldProps {
  width?: string | number;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps & { fullWidth?: boolean }>(
  ({ theme, width, fullWidth }) => ({
    width: fullWidth ? "100%" : width || "auto",
    "& .MuiInputBase-root": {
      borderRadius: 12,
      backgroundColor: "#fff",
      fontSize: 14,
      paddingRight: 8,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d6d6d6",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    "& .MuiInputLabel-root": {
      fontSize: 14,
      direction: "rtl",
      textAlign: "right",
      color: "#555",
    },
    "& .MuiFormHelperText-root": {
      fontSize: 12,
    },
  })
);

interface CustomTextFieldProps extends TextFieldProps {
  width?: string | number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ width, ...props }) => {
  return (
    <StyledTextField
      variant="outlined"
      width={width}
      {...props} // 🔑 make sure InputProps gets forwarded
    />
  );
};

export default CustomTextField;
