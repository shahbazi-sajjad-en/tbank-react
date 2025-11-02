"use client"

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Card } from '@mui/material'
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetAccountsData } from "src/@api/accounts"
import ExcelButton from 'src/@core/components/excell-export'
import StatusChip from "src/@core/components/mui/chip/status-chip"
import { setSelectedId } from "src/store/apps/accounts"
import TableColumns from "../datagird/dataGrid"
import FilterAccounts from "./filter-accounts"
import StatusModal from './components/amountStatusModal'
import { getStatusColor } from 'src/@utils/get-status-color'
import { RootState } from 'src/store'

export default function AccountManagmentDataGrid() {

    const [accountList, setAccountList] = useState({ count: 0, list: [] })
    const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 20 })
    const [filters, setFilters] = useState({})
    const [loading, setLoading] = useState(false)
    const [selectedIdInRow, setSelectedIdInRow] = useState<string>("")
    const [openStatus, setOpenStatus] = useState(false)
    const [status, setStatus] = useState(false)

    const router = useRouter()
    const dispatch = useDispatch()
    const selectedId = useSelector((state: RootState) => state.account.selectedId)

    // ✅ فقط این تابع دیتا می‌گیره
    const fetchData = async (customFilters = filters, customPagination = pagination) => {
        setLoading(true)
        // setAccountList(prev => ({ ...prev, list: [] }))

        const postedData = {
            ...customPagination,
            ...customFilters,
            firstName: null,
            lastName: null
        }

        try {
            const res = await GetAccountsData(postedData)
            setAccountList({ count: res.count, list: res.list })

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // 🔹 هر وقت صفحه عوض شد یا فیلتر تغییر کرد → دیتا بگیر
    useEffect(() => {
        fetchData(filters, pagination)
    }, [pagination])

    // 🔹 وقتی فیلتر اعمال میشه
    const handleFilterApply = (newFilters) => {
        setFilters(newFilters)
        setPagination({ pageNumber: 0, pageSize: pagination.pageSize }) // ✅ ریست به صفحه اول
        fetchData(newFilters, { pageNumber: 0, pageSize: pagination.pageSize })
    }

    const columns = useMemo(() => [
        { field: "number", headerName: "شماره حساب", flex: 1, align: "center", headerAlign: "center" },
        { field: "identifier", headerName: "شناسه شخص", flex: 1, align: "center", headerAlign: "center" },
        {
            field: "accountOwner",
            headerName: "صاحب حساب",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: (params: any) => (
                <span>{params?.row?.accountOwner.includes("null") ? "-" : params.row.accountOwner}</span>
            )
        },
        { field: "financialProductType", headerName: "نوع حساب", flex: 1, align: "center", headerAlign: "center" },
        { field: "availableBalance", headerName: "موجودی", flex: 1, align: "center", headerAlign: "center" },
        { field: "blockBalance", headerName: "موجودی مسدود شده", flex: 1, align: "center", headerAlign: "center" },
        { field: "creditBalance", headerName: "موجودی اعتباری ", flex: 1, align: "center", headerAlign: "center" },
        { field: "currency", headerName: "ارز", flex: 1, align: "center", headerAlign: "center" },
        {
            field: "status", headerName: "وضعیت", flex: 1, align: "center", headerAlign: "center",
            renderCell: (params: any) => (
                <div className="flex mt-3 justify-center gap-2">
                    <StatusChip label={params.row.status} skin='light' color={getStatusColor(params.row.status)} />
                </div>
            )
        },
        {
            field: "actions",
            headerName: "عملیات",
            align: "center",
            headerAlign: "center",
            flex: 1,
            renderCell: (params: any) => (
                <div className="flex mt-4 justify-center gap-2">
                    <VisibilityIcon
                        className="opacity-50 cursor-pointer"
                        onClick={() => {
                            router.push("/account-managment/detail")
                            dispatch(setSelectedId(params.row.number))
                        }}
                    />
                    {params.row.status === "فعال" || params.row.status === "باز" ? (
                        <LockOutlinedIcon
                            color="error"
                            className='!cursor-pointer'
                            onClick={() => {
                                setStatus(true)
                                setSelectedIdInRow(params.row.id)
                                setOpenStatus(true)
                            }}
                        />
                    ) : (
                        <LockOpenOutlinedIcon
                            color="success"
                            className="opacity-75 cursor-pointer"
                            onClick={() => {
                                setStatus(false)
                                setSelectedIdInRow(params.row.id)
                                setOpenStatus(true)
                            }}
                        />
                    )}
                </div>
            )
        }
    ], [dispatch, router])

    return (
        <div>
            <FilterAccounts
                onFilterApply={handleFilterApply}
                loading={loading}
            />

            <Card sx={{ marginTop: "1rem" }}>
                <div className='m-3 flex justify-end'>
                    <ExcelButton disabled={true} onExport={() => { }} />
                </div>
                <div className='max-h-full overflow-scroll'>
                    <TableColumns
                      key={accountList.count}
                        pagination={pagination}
                        setPagination={setPagination}
                        totalCount={accountList.count}
                        columns={columns}
                        loading={loading}
                        rows={accountList.list}
                        rowCount={accountList.count}
                        pageSize={pagination.pageSize}
                        onPageChange={(newPage) =>
                            setPagination((prev) => ({ ...prev, pageNumber: newPage }))
                        }
                    />
                </div>
            </Card>

            <StatusModal
                fetchData={() => fetchData(filters, pagination)}
                selectedIdInRow={selectedIdInRow}
                isBlock={status}
                open={openStatus}
                setOpen={setOpenStatus}
            />
        </div>
    )
}
