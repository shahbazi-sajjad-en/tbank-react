import React from "react"
import { Autocomplete, TextField, FormHelperText } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: "13.8rem",
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 14,
    "& fieldset": {
      borderColor: "#d6d6d6",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  "& .MuiAutocomplete-option": {
    backgroundColor: "transparent !important",
    "&.Mui-selected": {
      backgroundColor: "transparent !important",
    },
    "&.Mui-selected:hover": {
      backgroundColor: `${theme.palette.action.hover} !important`,
    },
    "&:hover": {
      backgroundColor: `${theme.palette.action.hover} !important`,
    },
  },
}))
interface CustomAutocompleteProps<T = string | number> {
  label: string
  value: T | null
  options: Option<T>[]
  helperText?: string
  onChange: (value: T | null) => void
  fullWidth?: boolean
  disabled?: boolean
  valueKey?: keyof Option<T>
  labelKey?: keyof Option<T>
}

function CustomAutocomplete<T extends string | number>({
  label,
  options,
  value,
  onChange,
  helperText,
  fullWidth = true,
  disabled,
  valueKey = "value",  // پیش‌فرض value
  labelKey = "description",  // پیش‌فرض label
}: CustomAutocompleteProps<T>) {



  return (
    <div style={{ width: fullWidth ? "100%" : "auto" }}>
      <StyledAutocomplete
        noOptionsText="نتیجه‌ای پیدا نشد"
        options={options}
        getOptionLabel={(option) => option[labelKey] as string || ""}
        value={options?.length && options?.find((opt) => opt[valueKey] === value) || null}
        onChange={(_, newValue) => {
          onChange(newValue ? (newValue[valueKey] as T) : null)
        }}
        isOptionEqualToValue={(option, val) => option[valueKey] === val?.[valueKey]}
        disableClearable={false}
        disabled={disabled}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        fullWidth
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  )
}

export default CustomAutocomplete
