// ** MUI Imports

// ** Third Party Imports
import clsx from 'clsx'

// ** Types
import { CustomChipProps } from './types'

// ** Hooks Imports
import useBgColor, { UseBgColorType } from '@core/hooks/useBgColor'
import { Box } from '@mui/material'

const Chip = (props: CustomChipProps) => {
  // ** Props
  const { sx, skin, color, rounded = true, label } = props

  // ** Hook
  const bgColors = useBgColor()

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  }

  const propsToPass = { ...props }
  propsToPass.rounded = undefined

  return (
    <Box
      {...propsToPass}
      variant='filled'
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light'
      })}
      sx={{
        ...(skin === 'light' && color ? colors[color] : {}),
        ...sx,
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        px: 0,
        py: 0,
        minWidth: 0,
        '& .MuiChip-label': {
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          textAlign: 'center'
        }
      }}
    >
      {label}
    </Box>
  )
}

export default Chip
