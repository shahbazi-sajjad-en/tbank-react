"use client"

import React from "react"
import MuiButton, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"


// ✅ Custom styled button with nicer disabled style
const StyledButton = styled(MuiButton)(({ theme, width }) => ({
    borderRadius: 6,
    textTransform: "none",
    padding: "10px 20px",
    whiteSpace: "nowrap",
    fontSize: "0.95rem",
    width: width || "10rem",
    fontWeight: 600,
    boxShadow: "none",
    height: "38px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    // Styles based on variant
    "&.MuiOutlinedButton": {
        backgroundColor: "#fff",
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.main,
        },
    },

    "&.MuiContainedButton": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        },
    },

    "&.Mui-disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
        opacity: 0.7,
        cursor: "not-allowed",
        boxShadow: "none",
        border: "1px solid #ccc",
        transition: "all 0.3s ease",
    },
    "&.MuiButton-containedError": {
        backgroundColor: theme.palette.error.main,
        color: "#fff",
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        },
    },
}))

interface CustomButtonProps extends ButtonProps {
    label?: string
    color?: "primary" | "secondary" | "error" | "success" | "info" | "warning"
    width?: string
    variant?: "contained" | "outlined" | "text"
}


const CustomButton: React.FC<CustomButtonProps> = ({ label, variant = "contained", color, width, ...props }) => {
    return (
        <StyledButton color={color} width={width} variant={variant} {...props}>
            {label}
        </StyledButton>
    )
}

export default CustomButton
