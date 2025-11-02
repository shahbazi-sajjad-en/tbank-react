// ** React Imports
import { Fragment } from 'react';
import { LuUserRound } from "react-icons/lu";

// ** Next Import
import { useRouter } from 'next/navigation';
// ** MUI Imports
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

// ** Icon Imports

// ** Context

// ** Type Imports
import { Settings } from '@core/context/settingsContext';

interface Props {
  settings: Settings
}

// ** Styled Components


const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({

  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main

  }
}))

const UserDropdown = (props: Props) => {


  // ** Hooks
  const router = useRouter()

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      color: 'text.primary'
    }
  }



  return (
    <Fragment>

      <LuUserRound  fontSize="28px" className='!cursor-pointer mb-1' onClick={() => router.push("/profile")}
      />

    </Fragment>
  )
}

export default UserDropdown
