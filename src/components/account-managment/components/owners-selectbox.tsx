"use client"

import React, { useState } from "react"
import { Card, Popover, Typography, Box } from "@mui/material"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

export default function OwnersSelectbox({ data }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "owners-popover" : undefined
  return (
    <div>
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
        <h3>{data?.accountOwner}</h3>
        <MdOutlineKeyboardArrowDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          size={20}
        />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: { borderRadius: 2, mt: 1, minWidth: 200, p: 1 },
        }}
      >
        <Card sx={{ p: 1, boxShadow: "none" }}>
          {data?.roles?.map((owner: string, i: number) => (
            <Box
              key={i}
              onClick={handleClose}
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              <Typography fontSize={14}>{owner.partyName}</Typography>
            </Box>
          ))}
        </Card>
      </Popover>
    </div>
  )
}
