"use client"

import { Card } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi"
import { useSelector } from "react-redux"
import { GetAccountCards } from "src/@api/cards/account-cards"
import { ExportExcel } from "src/@api/cards/excel"
import { GetMediaTypes } from "src/@api/cards/media-types"
import ExcelButton from "src/@core/components/excell-export"
import StatusChip from "src/@core/components/mui/chip/status-chip"
import CustomTextField from "src/@core/components/text-fields"
import { downloadBase64File } from "src/@utils/download-excel"
import { getStatusColor } from "src/@utils/get-status-color"
import { RootState } from "src/store"
import CustomTableColumns from "../datagird/customDataGrid"
import CurrencyFilter from "../filters/currency"
import MediaTypesCard from "./components/media-types-cards"
import StatusFilter from "./components/status-filter"

export default function CardsManagmentDataGrid() {
    const [cardsList, setCardsList] = useState({ count: 0, list: [] })
    const [selectedMedia, setSelectedMedia] = useState(0)
    const [mediaTypes, setMediaTypes] = useState([])
    const [loading, setLoading] = useState(false)
    const [currency, setCurrency] = useState("")
    const [status, setStatus] = useState("")
    const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 10 })
    const [excelLoading, setExcelLoading] = useState(false)
    const [searchCard, setSearchCard] = useState("") // 🔍 جستجو بر اساس شماره کارت
    const selectedId = useSelector((state: RootState) => state.account.selectedId)

    // ✅ 1. فقط یک بار media types رو بگیر
    useEffect(() => {
        const fetchMediaTypes = async () => {
            try {
                const mediaRes = await GetMediaTypes()
                const types = mediaRes?.mediaTypes || mediaRes || []
                setMediaTypes(types)
                if (types.length > 0) {
                    setSelectedMedia(types[0].code)
                }
            } catch (err) {
                toast.error("خطا در دریافت نوع رسانه‌ها")
            }
        }
        fetchMediaTypes()
    }, [])

    // ✅ 2. هر بار که فیلترها یا شماره صفحه تغییر کرد → کارت‌ها رو بگیر
    useEffect(() => {
        if (!selectedMedia || !selectedId) return

        let isMounted = true
        const fetchCards = async () => {
            try {
                setLoading(true)
                const postedData = {
                    serialNumber: searchCard?.trim() || null,
                    accountNumber: "",
                    mediaTypeCode: selectedMedia,
                    mediaStatusTypeCode: status,
                    issueDate: null,
                    currencyTypeCode: currency
                }
                const cardsRes = await GetAccountCards(postedData)
                if (isMounted) {
                    setCardsList({ count: cardsRes.count, list: cardsRes.list })
                }
            } catch (err) {
                toast.error("خطایی در دریافت کارت‌ها رخ داده است")
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchCards()
        return () => {
            isMounted = false
        }
    }, [selectedId, pagination.pageNumber, selectedMedia, searchCard, currency, status])

    const columns = useMemo(() => [
        { field: "serialNumber", headerName: "شماره کارت", flex: 1, align: "center", headerAlign: "center" },
        { field: "currencyType", headerName: "ارز", flex: 1, align: "center", headerAlign: "center" },
        { field: "expiryDate", headerName: "تاریخ انقضا", flex: 1, align: "center", headerAlign: "center" },
        {
            field: "status", headerName: "وضعیت", flex: 1, align: "center", headerAlign: "center",
            renderCell: (params) => (
                <div className="mt-2 flex justify-center">
                    <StatusChip label={params.row.status} skin='light' color={getStatusColor(params.row.status)} />
                </div>
            )
        },
    ], [])

    // 📤 خروجی اکسل
    const handleExportClick = () => {
        setExcelLoading(true)
        const postedData = {
            serialNumber: searchCard?.trim() || "",
            accountNumber: selectedId || "",
            mediaTypeCode: selectedMedia || ""
        }
        ExportExcel(postedData)
            .then((res) => {
                downloadBase64File(res.base64Data, res.fileType, res.fileName)
                setExcelLoading(false)
            })
            .catch(() => {
                setExcelLoading(false)
                toast.error("دریافت فایل گزارش با خطا مواجه شد")
            })
    }

    return (
        <div className="flex flex-col gap-4">

            <MediaTypesCard
                mediaTypes={mediaTypes}
                selectedMedia={selectedMedia}
                setSelectedMedia={setSelectedMedia}
            />

            <Card>
                <div className="flex justify-between items-center p-6">
                    <div className="flex items-center gap-4">
                        <CustomTextField
                            width={"22rem"}
                            label="جستجو بر اساس شماره کارت"
                            value={searchCard}
                            onChange={(e: any) => setSearchCard(e.target.value)}
                        />
                        <CurrencyFilter currency={currency} setCurrency={setCurrency} />
                        <StatusFilter status={status} setStatus={setStatus} />
                    </div>

                    <ExcelButton
                        disabled={!cardsList.list.length}
                        loading={excelLoading}
                        onClick={handleExportClick}
                        width="150px"
                        startIcon={<PiMicrosoftExcelLogoDuotone />}
                        label="دانلود گزارش"
                    />
                </div>

                <CustomTableColumns
                    cardTitle=""
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
            </Card>
        </div>
    )
}
