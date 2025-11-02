import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { Card, useTheme } from '@mui/material'
import { useState } from 'react'
import { useNumberSeprepator } from 'src/hooks/useNumberSeprepator'
import RechartsPieChart from './chart'
import Menu from './menu'


interface AccountBalanceProps {
    data: {
        monetaryBalance: string | number
        availableBalance: number | string
        blockBalance: number | string
        creditBalance: number | string

    }
    fetchData?: () => void
}

export default function AccountBalance({ data, fetchData }: AccountBalanceProps) {
    const theme = useTheme()
    const [visible, setVisible] = useState(true)
    const formattedMonetaryBalance = useNumberSeprepator(data?.monetaryBalance)
    const formattedAvailableBalance = useNumberSeprepator(data?.availableBalance)
    const formattedBlockedBalance = useNumberSeprepator(data?.blockBalance)
    const formattedCreditBalance = useNumberSeprepator(data?.creditBalance)

    return (
        <Card className='col-span-2 px-5' sx={{ background: 'white', p: 2, ml: '1rem' }}>
            <div className='flex items-center justify-between'>
                <h2>موجودی قابل برداشت</h2>
                <Menu refetchData={fetchData} blockedBalance={formattedBlockedBalance} />
            </div>
            <div className='flex px-5 justify-between items-center'>
                <div>
                    <div style={{ margin: '17px 0' }}>
                        <span style={{ fontSize: '30px' }}>
                            {visible ? formattedAvailableBalance : '*******'}
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
                    availableBalance={data?.monetaryBalance || 0}
                    blockedBalance={data?.blockBalance || 0}
                    creditBalance={data?.creditBalance || 0}
                />
            </div>
            <div className='flex items-center  mx-2 '>
                <div>


                    <div className='flex  gap-4 items-center '>
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
                                <span className='text-[#2F2B3D66]'>موجودی نقدی</span>
                            </div>
                            <span style={{ marginTop: '4px' }} className='ml-2 text-center text-[#24B364]'>
                                {visible ? formattedMonetaryBalance : '*******'}
                            </span>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex items-center'>
                                <span
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FFB700',
                                        display: 'inline-block',
                                        marginLeft: '6px'
                                    }}
                                />
                                <span className='text-[#2F2B3D66]'>موجودی اعتباری</span>
                            </div>
                            <span style={{ marginTop: '4px' }} className='ml-2 text-center text-[#FFB700]'>
                                {visible ? formattedCreditBalance : '*******'}

                            </span>
                        </div>

                        <div className='flex flex-col'>
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
                            <span style={{ marginTop: '4px' }} className='ml-2 text-center text-[#E64449]'>
                                {visible ? formattedBlockedBalance : '*******'}

                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    )
}
