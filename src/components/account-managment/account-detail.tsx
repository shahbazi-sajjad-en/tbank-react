"use client"

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlineIcon from '@mui/icons-material/LockOutline'
import { CardHeader, Skeleton, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { IoWalletOutline } from "react-icons/io5"
import { LiaFileSignatureSolid } from "react-icons/lia"
import { LuUsersRound } from "react-icons/lu"
import { useSelector } from "react-redux"
import { GetAccountDetail } from "src/@api/accounts"
import CustomButton from "src/@core/components/button"
import CustomBadge from 'src/@core/components/mui/badge'
import CustomChip from 'src/@core/components/mui/chip'
import { RootState } from "src/store"
import TableColumns from '../datagird/dataGrid'
import AccountOwnersModal from './account-owners-modal'
import AccountBalance from "./components/account-balance"
import StatusModal from './components/amountStatusModal'
import DetailModal from './components/detailModal'
import OwnersSelectbox from './components/owners-selectbox'
import { Icon } from '@iconify/react'

export default function AccountDetail() {
    const [data, setData] = useState<any>(null)
    const [detailModal, setDetailModal] = useState(false)
    const [isBlocked, setIsBlocked] = useState<boolean>(false)
    const [selectedIdInRow, setSelectedIdInRow] = useState<string>("")
    const [openOwnerModal, setOpenOwnersModal] = useState<boolean>()
    const [amountStatusModal, setAmountStatusModal] = useState<boolean>(false)
    const router = useRouter()
    const [loading, seLoading] = useState(false)
    const selectedId = useSelector(
        (state: RootState) => state.account.selectedId
    )
    const fetchData = async (postedData) => {
        seLoading(true);
        try {
            const res = await GetAccountDetail(postedData); // ← اینجا await اضافه شد
            setData(res.data);
            setIsBlocked(res.data?.status === "مسدود");
        } catch (err) {
            console.error("fetch account detail error:", err);
        } finally {
            seLoading(false);
        }
    };

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

    if (loading) {
        return (
            <div className="p-4 bg-gray-50 min-h-screen">
                <h2 className="mb-3 text-lg font-bold text-gray-700">جزئیات حساب</h2>

                <Card
                    className="flex justify-between items-center mb-4 p-4 shadow-sm"
                    style={{ backgroundColor: "#fff" }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Skeleton sx={{ background: "#0000001c" }} variant="circular" width={40} height={40} animation="wave" />
                        <Skeleton sx={{ background: "#0000001c" }} variant="text" width={120} height={30} animation="wave" />
                        <Skeleton sx={{ background: "#0000001c" }} variant="text" width={100} height={30} animation="wave" />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton
                                sx={{ background: "#0000001c" }}
                                key={i}
                                variant="rounded"
                                width={120}
                                height={36}
                                animation="wave"
                            />
                        ))}
                    </Stack>
                </Card>

                <div className="grid grid-cols-3  gap-3">
                    {/* اطلاعات حساب */}
                    <Card className="p-4 col-span-1 shadow-sm">
                        <Skeleton
                            sx={{ background: "#0000001c", mb: 2 }}
                            variant="text"
                            width="50%"
                            height={30}
                            animation="wave"
                        />
                        {[1, 2, 3, 4].map((i) => (
                            <Stack
                                key={i}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                className="mb-2"
                            >
                                <Skeleton sx={{ background: "#0000001c" }}
                                    variant="text" width={80} height={24} animation="wave" />
                                <Skeleton sx={{ background: "#0000001c" }}
                                    variant="text" width={100} height={24} animation="wave" />
                            </Stack>
                        ))}
                    </Card>

                    {/* مانده حساب */}
                    <Card className="p-4 col-span-2 shadow-sm">
                        <Skeleton sx={{ background: "#0000001c" }}
                            variant="text" width="40%" height={28} animation="wave" />
                        <Skeleton
                            sx={{ background: "#0000001c" }}

                            variant="rounded"
                            width="100%"
                            height={150}
                            animation="wave"
                        />
                    </Card>
                </div>

                {/* جدول تراکنش‌ها */}
                <Card className="mt-6 p-4 shadow-sm">
                    <Skeleton
                        sx={{ background: "#0000001c", mb: 2 }}

                        variant="text"
                        width="30%"
                        height={28}
                        animation="wave"
                    />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Stack
                            key={i}
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                            sx={{ mb: 1 }}
                        >
                            <Skeleton sx={{ background: "#0000001c" }}
                                variant="text" width="20%" height={24} animation="wave" />
                            <Skeleton sx={{ background: "#0000001c" }}
                                variant="text" width="15%" height={24} animation="wave" />
                            <Skeleton sx={{ background: "#0000001c" }}
                                variant="text" width="20%" height={24} animation="wave" />
                            <Skeleton sx={{ background: "#0000001c" }}
                                variant="text" width="10%" height={24} animation="wave" />
                        </Stack>
                    ))}
                </Card>
            </div>
        );
    }

    const valid_acc_owner = data?.accountOwner.split(" ")[0] != "null"
    return (
        <div >

            {/* <h2 className='mb-3'>جزئیات حساب</h2> */}


            <Card className='flex flex-col lg:flex-row justify-between mb-4 pt-2 md:p-4 gap-4'>
                <div className='flex items-center'>
                    <CustomChip sx={{ mx: "5px" }} label={<IoWalletOutline fontSize="24px" />} skin='light' color='primary' />
                    {valid_acc_owner ? data?.accountOwner : "امکان نمایش وجود ندارد!"}
                    {/* <OwnersSelectbox data={data} /> */}
                    {/* <span>{data?.number}</span> */}
                </div>

                <div className='flex flex-wrap justify-center mr-4 gap-4 mb-4 md:mb-0 items-center'>
                    <CustomButton
                        disabled
                        onClick={(() => setOpenOwnersModal(true))}
                        // onClick={() => router.push("/account-managment/detail/cards")}
                        startIcon={<LiaFileSignatureSolid />}
                        label="امضاداران"
                    />
                    <CustomButton
                        onClick={(() => setOpenOwnersModal(true))}
                        // onClick={() => router.push("/account-managment/detail/cards")}
                        startIcon={<LuUsersRound />}
                        label=" نقش‌های حساب"
                    />

                    <CustomButton
                        onClick={() => router.push("/account-managment/detail/cards")}
                        startIcon={<Icon icon={"tabler:credit-card"} />}
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

            <div className='grid grid-cols-1 md:grid-cols-3  items-stretch '>
                <div style={{ background: "white" }} className=' col-span-1'>
                    <div className='flex px-5 py-4 items-center justify-between'>
                        <h3 className='font-extrabold' >اطلاعات حساب</h3>
                        <div className='ml-4'>
                            <CustomBadge skin='light' color={isBlocked ? 'error' : 'success'} badgeContent={isBlocked ? "مسدود" : data?.status} />

                        </div>
                    </div>
                    <div className='flex flex-col gap-3 p-4 justify-between '>
                        {[
                            { label: "شماره حساب", key: "number" },
                            { label: "نوع حساب", key: "financialProductType" },
                            { label: "ارز ", key: "currency" },
                            { label: "شعبه", key: "provider" },
                            // { label: "نرخ سود", key: "interestRate" },
                        ].map((field, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>{field.label}</span>
                                <span>{data?.[field.key] ?? "-"}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <AccountBalance fetchData={fetchData} data={data} />
            </div>
            <Card style={{ marginTop: "1rem" }}>

                <div className='flex items-center  justify-between'>
                    <CardHeader title="تراکنش‌های اخیر" />
                </div>
                <TableColumns
                    footerTxt="مشاهده همه تراکنش ها..."
                    columns={columns}
                    rows={data?.accountTransaction}
                    rowCount={data?.accountTransaction?.length}
                    totalCount={data?.accountTransaction?.length}
                    loading={false}
                    hasPagination={false}
                />
            </Card>


            <StatusModal isBlock={isBlocked} fetchData={fetchData} open={amountStatusModal} setOpen={setAmountStatusModal} />
            <DetailModal isBlock={isBlocked} fetchData={fetchData} open={detailModal} setOpen={setDetailModal} />
            <AccountOwnersModal open={openOwnerModal} setOpen={setOpenOwnersModal} data={data} fetchData={fetchData} />
        </div>
    )


}
