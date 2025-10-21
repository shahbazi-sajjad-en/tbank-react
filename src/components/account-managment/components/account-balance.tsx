import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { Card, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNumberSeprepator } from 'src/hooks/useNumberSeprepator'
import RechartsPieChart from './chart'
import Menu from './menu'

export default function AccountBalance({ data }: any) {
    const theme = useTheme()
    const [visible, setVisible] = useState(true)
    const formattedMonetaryBalance = useNumberSeprepator(data?.monetaryBalance)
    const formattedAvailableBalance = useNumberSeprepator(data?.availableBalance)
    const formattedBlockedBalance = useNumberSeprepator(data?.blockBalance)
   

    return (
        <Card className='col-span-2 px-px' sx={{ background: 'white', p: 2, ml: '1rem' }}>
            <div className='flex items-center justify-between'>
                <h2>موجودی کل حساب</h2>
                <Menu  />
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <div style={{ margin: '17px 0' }}>
                        <span style={{ fontSize: '30px' }}>
                            {visible ? formattedMonetaryBalance : '**************'}
                        </span>
                        <span style={{ fontSize: '30px' }} className='ml-1'>
                            ریال
                        </span>
                        {visible ? (
                            <RemoveRedEyeOutlinedIcon
                                sx={{ color: theme.palette.primary.main, cursor: 'pointer', ml: '1rem' }}
                                onClick={() => setVisible(false)}
                            />
                        ) : (
                            <VisibilityOffOutlinedIcon
                                sx={{ color: theme.palette.primary.main, cursor: 'pointer', ml: '1rem' }}
                                onClick={() => setVisible(true)}
                            />
                        )}
                    </div>

                </div>
                {/* ✅ ارسال نسبت‌ها به چارت */}
                <RechartsPieChart
                    availableBalance={data?.availableBalance || 0}
                    blockedBalance={data?.blockBalance || 0}
                />
            </div>
            <div className='flex items-center justify-between'>
                <div>


                    <div className='flex justify-between items-center '>
                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <span
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#24B364',
                                        display: 'inline-block',
                                        marginLeft: '6px'
                                    }}
                                />
                                <span className='text-[#2F2B3D66]'>موجودی قابل برداشت</span>
                            </div>
                            <span style={{ marginTop: '4px' }} className='ml-2 text-[#24B364]'>
                                {formattedAvailableBalance}
                            </span>
                        </div>

                        <div style={{ marginRight: "2rem" }} className='flex flex-col'>
                            <div className='flex items-center'>
                                <span
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#E64449',
                                        display: 'inline-block',
                                        marginLeft: '6px'
                                    }}
                                />
                                <span className='text-[#2F2B3D66]'>موجودی مسدود شده</span>
                            </div>
                            <span style={{ marginTop: '4px' }} className='ml-2 text-[#E64449]'>
                                {formattedBlockedBalance}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    )
}
