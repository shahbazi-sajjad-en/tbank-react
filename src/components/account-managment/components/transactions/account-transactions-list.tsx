"use client"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { TransActionsList } from "src/@api/account-detail/transactions-list"
import TableColumns from "src/components/datagird/dataGrid"
import { transactionColumns } from "./columns"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { RootState } from "src/store"

export default function AccountTransactionsList() {
    const [loading, setLoading] = useState(false)
    const [transActions, setTransActions] = useState({ list: [], count: 0 })
    const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 20 })
    const selectedId = useSelector(
        (state: RootState) => state.account.selectedId
    )

    const router = useRouter()
    const fetchTransactions = (page = pagination.pageNumber, size = pagination.pageSize) => {

        setLoading(true)
        const postedData = {
            accountNumber: selectedId,
            pageNumber: page,
            pageSize: size,
        }
        TransActionsList(postedData)
            .then((res) => {
                setLoading(false)

                setTransActions({ count: res.count, list: res.list })
            })
            .catch((err: any) => {
                setLoading(false);
                const message = err?.response?.data?.message || "دریافت تراکنش‌ها با خطا مواجه شد";
                toast.error(message);
            });

    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <div>
            <TableColumns
                columns={transactionColumns(router)} // 👈 router پاس داده میشه
                rows={transActions.list}
                rowCount={transActions.count}
                totalCount={transActions.count}
                loading={loading || !transActions?.list?.length}
                pageSize={pagination.pageSize}
                onPageChange={(newPage, pageSize) => {
                    setPagination({ pageNumber: newPage, pageSize })
                    fetchTransactions(newPage, pageSize)
                }}
            />
        </div>
    )
}
