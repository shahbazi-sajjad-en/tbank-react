// ** React Imports
import { MouseEvent, useState } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '@core/components/icon'

const options = [
  { label: 'مسدودی مبلغ', value: 'block_amount' },
  { label: 'رفع مسدودی', value: 'unblock_amount' }
]

const ITEM_HEIGHT = 48

interface MenuMaxHeightProps {
  handleMenuClick: (value: string) => void
}

const MenuMaxHeight = ({ handleMenuClick }: MenuMaxHeightProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value?: string) => {
    setAnchorEl(null)
    if (value) {
      handleMenuClick(value)
    }
  }

  return (
    <div>
      <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        id='long-menu'
        anchorEl={anchorEl}
        onClose={() => handleClose()}
        open={Boolean(anchorEl)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          }
        }}
      >
        {options.map(option => (
          <MenuItem key={option.value} onClick={() => handleClose(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default MenuMaxHeight
