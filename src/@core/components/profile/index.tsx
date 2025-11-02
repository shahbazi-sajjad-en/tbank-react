



// ** React Imports
import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'

// ** MUI Components
import TabContext from '@mui/lab/TabContext'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled, Theme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Type Import
import {
    ProfileTabType,
    ProjectsTabType,
    TeamsTabType,
    UserProfileActiveTab
} from 'src/@fake-db/types'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components
import Profile from 'src/views/pages/user-profile/profile'
import Projects from 'src/views/pages/user-profile/projects'
import Teams from 'src/views/pages/user-profile/teams'
import UserProfileHeader from 'src/views/pages/user-profile/UserProfileHeader'
import { GetUserProfile } from 'src/@api/profile/get-user'
import toast from 'react-hot-toast'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
    borderBottom: '0 !important',
    color: theme.palette.secondary.light,
    '& .MuiTabs-indicator': {
        display: 'none'
    },
    '& .Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
        minWidth: 65,
        minHeight: 38,
        lineHeight: 1,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('sm')]: {
            minWidth: 130
        }
    }
}))

const UserProfile = ({ tab }: { tab: string }) => {
    // ** State
    const [activeTab, setActiveTab] = useState<string>("profile")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState("")


    const fetchUserProfile = () => {
        GetUserProfile().then((res) => {
            setData(res)
        }).catch((err) => {
            toast.error("دریافت اطلاعات با خطا مواجه شد.")
        })
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    // ** Hooks
    const router = useRouter()
    const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const handleChange = (event: SyntheticEvent, value: string) => {
        setIsLoading(true)
        setActiveTab(value)
        router
            .push({
                pathname: `/pages/user-profile/${value.toLowerCase()}`
            })
            .then(() => setIsLoading(false))
    }

    useEffect(() => {
        if (data) {
            setIsLoading(false)
        }
    }, [data])

    useEffect(() => {
        if (tab && tab !== activeTab) {
            setActiveTab(tab)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])

    const tabContentList: { [key: string]: ReactElement } = {
        profile: <Profile data={data as ProfileTabType} />,
        security: <Teams data={data as TeamsTabType[]} />,
        notifications: <Projects data={data as ProjectsTabType[]} />,
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UserProfileHeader />
            </Grid>
            {
                <Grid item xs={12}>
                    <TabContext value={activeTab}>
                        <div className='flex flex-col gap-4'>
                            <Grid item xs={12}>
                                <TabList
                                    variant='scrollable'
                                    scrollButtons='auto'
                                    onChange={handleChange}
                                    aria-label='customized tabs example'
                                >
                                    <Tab
                                        value='profile'
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize='1.125rem' icon='tabler:user-check' />
                                                {!hideText && 'پروفایل'}
                                            </Box>
                                        }
                                    />
                                    <Tab
                                        disabled
                                        value='security'
                                        className='text-gray-500'
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize='1.125rem' icon='tabler:users' />
                                                {!hideText && 'امنیت'}
                                            </Box>
                                        }
                                    />
                                    <Tab
                                        disabled
                                        value='notifications'
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                                                <Icon fontSize='1.125rem' icon='tabler:bell' />
                                                پیام‌ها
                                            </Box>
                                        }
                                    />

                                </TabList>
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>

                                <TabPanel sx={{ p: 0 }} value={activeTab}>
                                    {tabContentList[activeTab]}
                                </TabPanel>

                            </Grid>
                        </div>
                    </TabContext>
                </Grid>
            }
        </Grid>
    )
}

export default UserProfile
