"use client"

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined'
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Card } from '@mui/material'
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { GetAccountsData } from "src/@api/accounts"
import ExcelButton from 'src/@core/components/excell-export'
import StatusChip from "src/@core/components/mui/chip/status-chip"
import { setSelectedId } from "src/store/apps/accounts"
import TableColumns from "../dataGrid"
import FilterAccounts from "../filter-accounts"
import StatusModal from './components/amountStatusModal'
import { getStatusColor } from 'src/@utils/get-status-color'

export default function AccountManagmentDataGrid() {

    const [accountList, setAccountList] = useState({
        count: 0,
        list: []
    })

    const [openStatus, setOpenStatus] = useState(false)
    const [status, setStatus] = useState(false)
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 10
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true);
            setAccountList(prev => ({ ...prev, list: [] }));

            const postedData = {
                ...pagination,
                firstName: null,
                lastName: null,
                accountNumber: null,
                currencyCode: null,
                serialNumber: null,
            };

            try {
                const res = await GetAccountsData(postedData);
                setAccountList({ count: res.count, list: res.list });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };


        fetchData()

        return () => {
            isMounted = false
        }
    }, [pagination])


    const columns = useMemo(() => [
        { field: "number", headerName: "شماره حساب", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        { field: "identifier", headerName: "شناسه شخص", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        { field: "accountOwner", headerName: "نام مشتری", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        { field: "financialProductType", headerName: "نوع حساب", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        { field: "availableBalance", headerName: "موجودی", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        { field: "blockBalance", headerName: "موجودی مسدودی", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        { field: "currency", headerName: "ارز", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true },
        {
            field: "status", headerName: "وضعیت", flex: 1, align: "center", headerAlign: "center", disableColumnMenu: true,

            renderCell: (params: any) => {
                return (
                    <div className="flex mt-3 justify-center gap-2">

                        <StatusChip label={params.row.status} skin='light' color={getStatusColor(params.row.status)} />

                    </div>
                )
            }


        },

        {
            field: "actions",
            headerName: "عملیات",
            align: "center",
            headerAlign: "center",
            flex: 1,
            renderCell: (params: any) => (

                <div className="flex mt-4 justify-center gap-2">

                    <VisibilityIcon className="opacity-50 cursor-pointer " onClick={() => {
                        router.push("/account-managment/detail")
                        dispatch(setSelectedId(params.row.number))
                    }} />

                    <SimCardDownloadOutlinedIcon className="opacity-50 cursor-pointer" />
                    {params.row.status == "فعال" ? <LockOutlinedIcon color='error' onClick={() => {
                        setStatus(true)
                        setOpenStatus(true)
                    }} className="opacity-75  cursor-pointer" />
                        : <LockOpenOutlinedIcon color='success' className="opacity-75  cursor-pointer" onClick={() => {
                            setStatus(false)
                            setOpenStatus(true)
                        }} />
                    }
                </div>
            )
        }
    ], [dispatch, router])


    const onExport = () => { }
    console.log("accountList.list", accountList.list)
    return (

        <>

            <FilterAccounts setLoading={setLoading} setAccountList={setAccountList} />
            <Card sx={{ marginTop: "1rem" }}>

                <div className='m-3 flex justify-end'>
                    <ExcelButton onExport={onExport} />

                </div>

                <TableColumns
                    totalCount={accountList.count}
                    columns={columns}
                    loading={loading || !accountList.list}
                    rows={accountList.list}
                    rowCount={accountList.count}
                    pageSize={pagination.pageSize}
                    onPageChange={(newPage) =>
                        setPagination((prev) => ({ ...prev, pageNumber: newPage }))
                    }
                />
            </Card>
            <StatusModal isBlock={status} open={openStatus} setOpen={setOpenStatus} />
        </>

    )
}
