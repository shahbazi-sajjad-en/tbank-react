"use client"

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlineIcon from '@mui/icons-material/LockOutline'
import { CardHeader } from '@mui/material'
import Card from '@mui/material/Card'
import { useEffect, useState } from "react"
import { IoWalletOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { GetAccountDetail } from "src/@api/accounts"
import CustomButton from "src/@core/components/button"
import CustomBadge from 'src/@core/components/mui/badge'
import CustomChip from 'src/@core/components/mui/chip'
import { RootState } from "src/store"
import TableColumns from '../dataGrid'
import AccountBalance from "./components/account-balance"
import StatusModal from './components/amountStatusModal'

export default function AccountDetail() {
    const [data, setData] = useState<any>(null)
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [amountStatusModal, setAmountStatusModal] = useState<boolean>(false)

    const selectedId = useSelector(
        (state: RootState) => state.account.selectedId
    )


    const fetchData = async (postedData) => {
        try {
            const res = await GetAccountDetail(postedData)
            setData(res.data)
            setIsBlocked(res.data?.status === "مسدود") // ✅ بر اساس داده واقعی از API
        } catch (err) {
            console.error("fetch account detail error:", err)
        }
    }
    useEffect(() => {
        if (!selectedId) return

        const postedData: any = { accountNumber: selectedId }
        fetchData(postedData)



    }, [selectedId])

    if (!selectedId) {
        return <div>هیچ حسابی انتخاب نشده ❌</div>
    }

    const handleToggleBlock = () => {
        setAmountStatusModal(true)


    }

    const columns = [
        { field: "transactionType", headerName: "عملیات", flex: 1 },
        {
            field: "amount",
            headerName: "مبلغ",
            flex: 1,
            renderCell: (params) => `${params.value?.toLocaleString()} ریال`,
        },
        {
            field: "status",
            headerName: "وضعیت",
            flex: 1,
            renderCell: (params) =>
                params.value === "انجام شده" ? (
                    <span style={{ color: "green", background: "#DFFFE2", padding: "4px 12px", borderRadius: "12px" }}>
                        موفق
                    </span>
                ) : (
                    <span style={{ color: "red", background: "#FFE2E2", padding: "4px 12px", borderRadius: "12px" }}>
                        ناموفق
                    </span>
                ),
        },
        {
            field: "date",
            headerName: "تاریخ",
            flex: 1,
            renderCell: (params) =>
                new Date(params.value).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
        },
        {
            field: "balance",
            headerName: "مانده",
            flex: 1,
            renderCell: (params) => params.value?.toLocaleString(),
        },
    ];

    return (
        <div className='overflow-y-auto max-h-full'>
            <h2>جزئیات حساب</h2>
            <Card style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div className='flex items-center'>
                    <CustomChip sx={{ mx: "5px" }} label={<IoWalletOutline fontSize="24px" />} skin='light' color='primary' />
                    <span>{data?.accountOwner}</span>
                    <span style={{ margin: "0 5px" }}>|</span>
                    <span>{data?.number}</span>
                </div>

                <div className='flex items-center'>
                    <CustomButton
                        sx={{ mr: "1rem" }}
                        startIcon={<AccountBalanceWalletOutlinedIcon />}
                        label="مشاهده کارت‌ها"
                    />

                    <CustomButton
                        onClick={handleToggleBlock}
                        startIcon={isBlocked ? <LockOpenOutlinedIcon /> : <LockOutlineIcon />}
                        color={isBlocked ? "success" : "error"} // ✅ رنگ دکمه
                        variant='outlined'
                        label={isBlocked ? "فعالسازی حساب" : "مسدودی حساب"} // ✅ متن دکمه
                    />
                </div>
            </Card>

            <div className='grid grid-cols-3 '>
                <div style={{ padding: "10px 2rem", background: "white" }} className='col-span-1'>
                    <div className='flex items-center justify-between'>
                        <h3 >اطلاعات حساب</h3>
                        <CustomBadge skin='light' color={isBlocked ? 'error' : 'success'} badgeContent={isBlocked ? "مسدود" : data?.status} />
                    </div>
                    {[
                        { label: "شماره حساب", key: "number" },
                        { label: "ارز ", key: "currency" },
                        { label: "شعبه", key: "provider" },
                        { label: "نرخ سود", key: "interestRate" },
                    ].map((field, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <span>{field.label}</span>
                            <span>{data?.[field.key] ?? "-"}</span>
                        </div>
                    ))}
                </div>

                <AccountBalance data={data} />
            </div>
            <Card style={{ marginTop: "1rem" }}>

                <div className='flex items-center  justify-between'>
                    <CardHeader title="تراکنش های اخیر" />
                    <CustomButton label='مشاهده همه' />
                </div>
                <TableColumns
                    columns={columns}
                    rows={data?.accountTransaction}
                    rowCount={data?.accountTransaction?.length}
                    totalCount={data?.accountTransaction?.length}
                    loading={false}
                    pageSize={5}
                    onPageChange={() => { }}
                />
            </Card>
            <StatusModal isBlock={isBlocked} fetchData={fetchData} open={amountStatusModal} setOpen={setAmountStatusModal} />

        </div>
    )
}
