import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { CiSearch } from 'react-icons/ci'

export default function SearchTextField({ placeholder }) {
    return (
        <TextField
            // sx={{ width: "20rem" }}
            size="medium"
            placeholder={placeholder}
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <CiSearch size={20} color="#777" />
                    </InputAdornment>
                ),
            }}
        />
    )
}
