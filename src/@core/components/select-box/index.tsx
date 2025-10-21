"use client"

import React from "react"
import { styled } from "@mui/material/styles"
import {
  Select,
  MenuItem,
  SelectProps,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material"

// ✅ Custom styled Select
const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: "#fff",
  // width: "260px",
  fontSize: 14,
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
}))

// ✅ Custom reusable component
interface CustomSelectProps extends SelectProps {
  label: string
  value: string | number
  options: { value: string | number; label: string; description?: string; code?: string }[]
  helperText?: string
  onChange: (value: string | number) => void // ✅ correct type
  fullWidth?: boolean
}


const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  helperText,
  fullWidth,
  ...props
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value || opt.code} value={opt.value || opt.code}>
            {opt.label || opt.description}
          </MenuItem>
        ))}
      </StyledSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}


export default CustomSelect
