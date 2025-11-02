// ** MUI Components
import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { LuUserRound } from "react-icons/lu"
import { PiCrownSimple } from "react-icons/pi";
import { rgbaToHex } from 'src/@core/utils/rgba-to-hex'

// ** Icon Imports

// ** Types
import { ProfileTabCommonType, ProfileTeamsType } from 'src/@fake-db/types'

interface Props {
  teams: ProfileTeamsType[]
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  overview: ProfileTabCommonType[]
}
const greyHexColor = rgbaToHex("rgba(51, 48, 60, 0.6)")


const renderList = (arr: ProfileTabCommonType[]) => {

  if (arr && arr.length) {
    return arr.map((item, index) => {

      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            // alignItems: 'center',
            flexDirection: "column",
            gap: "10px",
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: greyHexColor }
          }}
        >

          <div className='flex items-center '>
            <LuUserRound />
            <Typography sx={{ mx: 2, fontWeight: 500, color: greyHexColor }}>
              {`نام:`}
            </Typography>
            <Typography sx={{ color: greyHexColor }}>
              {item?.userFullName}
            </Typography>
          </div>
          <div className='flex items-center '>
            <Icon icon='tabler:phone' />
            <Typography sx={{ mx: 2, fontWeight: 500, color: greyHexColor }}>
              {`شماره تماس:`}
            </Typography>
            <Typography sx={{ color: greyHexColor }}>
              {item?.phoneNumber}
            </Typography>
          </div>
          <div className='flex items-center'>
            <PiCrownSimple />
            <Typography sx={{ mx: 2, fontWeight: 500, color: greyHexColor }}>
              {`نقش کاربر:`}
            </Typography>

            {item?.roles?.map((item) => <Typography sx={{ color: greyHexColor }}> {item}</Typography>)}
          </div>


        </Box>
      )
    })
  } else {
    return null
  }
}



const AboutOverivew = (props: Props) => {
  const { teams, about, contacts, overview } = props
  const titleColor = rgbaToHex("rgba(51, 48, 60, 0.38)")
  return (

    <Card className='w-96'>
      <CardContent>
        <Box sx={{ mb: 6 }}>
          <div className='flex mb-4 gap-1 items-center'>

            <Typography variant='body2' sx={{ textTransform: 'uppercase',fontSize:"18px",textAlign:"center"}}>
              اطلاعات کاربری
            </Typography>
          </div>

          {renderList([about])}
        </Box>


      </CardContent>
    </Card>



  )
}

export default AboutOverivew
