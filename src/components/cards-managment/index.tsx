"use client"

import VisibilityIcon from "@mui/icons-material/Visibility"
import IconButton from "@mui/material/IconButton"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { GetAccountsData } from "src/@api/accounts"
import { setSelectedId } from "src/store/apps/accounts"
import TableColumns from "../dataGrid"
import toast from "react-hot-toast"

export default function CardsManagmentDataGrid() {
    const [cardsList, setCardsList] = useState({
        count: 0,
        list: []
    })

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
            setLoading(true)
            const postedData = {
                firstName: null,
                lastName: null,
                accountNumber: null,
                currencyCode: null,
                serialNumber: null,
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize,
            }

            try {
                const res = await GetAccountsData(postedData)
                if (isMounted) {
                    setCardsList({ count: res.count, list: res.list })
                }
            } catch (err) {
                toast.error("خطایی رخ داده است")
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [pagination])


    const columns = useMemo(() => [
        { field: "number", headerName: "شماره حساب", flex: 1, align: "center", headerAlign: "center" },
        { field: "identifier", headerName: "شناسه شخص", flex: 1, align: "center", headerAlign: "center" },
        { field: "accountOwner", headerName: "نام مشتری", flex: 1, align: "center", headerAlign: "center" },
        { field: "financialProductType", headerName: "نوع حساب", flex: 1, align: "center", headerAlign: "center" },
        { field: "availableBalance", headerName: "موجودی", flex: 1, align: "center", headerAlign: "center" },
        { field: "blockBalance", headerName: "موجودی مسدودی", flex: 1, align: "center", headerAlign: "center" },
        { field: "currency", headerName: "ارز", flex: 1, align: "center", headerAlign: "center" },
        { field: "status", headerName: "وضعیت", flex: 1, align: "center", headerAlign: "center" },
        {
            field: "actions",
            headerName: "عملیات",
            align: "center",
            headerAlign: "center",
            flex: 0.5,
            renderCell: (params: any) => (
                <IconButton
                    color="primary"
                    onClick={() => {
                        router.push("/account-managment/detail")
                        dispatch(setSelectedId(params.row.number))
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            )
        }
    ], [dispatch, router])



    return (

        <>


            <TableColumns
                totalCount={cardsList.count}
                columns={columns}
                loading={loading}
                rows={cardsList.list}
                rowCount={cardsList.count}
                pageSize={pagination.pageSize}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, pageNumber: newPage }))
                }
            />
        </>

    )
}
