"use client"

import { useState } from "react"
import { ImNewTab } from "react-icons/im";

// ** MUI Imports
import Card from "@mui/material/Card"
import { DataGrid } from "@mui/x-data-grid"

import { faIR } from "@mui/x-data-grid/locales"
// ** Custom Toolbar
import CustomPagination from "src/@core/components/custom-pagination"

import Footer from "src/@core/layouts/components/shared-components/footer"
import { CustomSkeletonOverlay } from "./skeleton";
import { CardHeader } from "@mui/material";



interface TableColumnsProps {
    columns: { any }[]
    loading: boolean
    cardTitle: string
    rows: any[]
    rowCount: number
    hasPagination: boolean
    footerTxt: string
    totalCount: number
    pageSize?: number
    onPageChange?: (page: number, pageSize: number) => void
}






const CustomTableColumns = ({
    columns,
    rows,
    footerTxt,
    rowCount,
    cardTitle = "",
    hasPagination = true,
    totalCount,
    loading,
    pageSize = 10,
    onPageChange
}: TableColumnsProps) => {
    // ** States
    const [page, setPage] = useState<number>(0)




    return (
        < >
            {/* <CardHeader>{cardTitle}</CardHeader> */}
            {cardTitle}
            <DataGrid
            disableColumnSorting
                disableColumnMenu
                rows={!loading && (rows || []).map((row) => ({ ...row, id: row.id ?? row.number ?? Math.random() }))}
                columns={columns}
                rowCount={rowCount}
                pagination
                paginationMode="server"
                loading={loading}
                localeText={{
                    ...faIR.components.MuiDataGrid.defaultProps.localeText,
                    toolbarDensity: "تراکم",
                    toolbarExport: "خروجی",
                    noRowsLabel: "هیچ ردیفی یافت نشد",
                }}
                style={{
                    height: 400,
                    border: "1px solid #d6d6d6",
                    background: "white",
                    margin: "10px",
                    borderRadius: "12px",
                }}
                sx={{
                    "& .MuiDataGrid-columnSeparator": { display: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "white",
                        borderBottom: "1px solid #d6d6d6",
                    },
                    "& .MuiDataGrid-cell": { borderBottom: "1px solid #e0e0e0" },
                    "& .MuiDataGrid-columnHeader": {
                        whiteSpace: "nowrap",
                        justifyContent: "center",
                        textAlign: "center",
                    },
                    "& .MuiDataGrid-columnHeadersInner": {
                        minHeight: "30px !important",
                    },
                }}
                slots={{
                    loadingOverlay: CustomSkeletonOverlay,
                    footer: () => (
                        hasPagination ?
                            <div style={{ display: "flex", justifyContent: "flex-end", padding: "0.5rem 1rem" }}>
                                <CustomPagination
                                    page={page}
                                    pageSize={pageSize}
                                    rowCount={rowCount}
                                    totalCount={totalCount}
                                    client={false}
                                    onPageChange={(newPage) => {
                                        setPage(newPage);
                                        onPageChange?.(newPage, pageSize);
                                    }}
                                />

                            </div>
                            : <div style={{ padding: "1rem 0", marginBottom: "10px" }}
                                className="flex items-center cursor-pointer gap-2 justify-center ">
                                <ImNewTab fontSize="20px" className="text-blue-500" />
                                <a target="_blank" href="/account-managment/detail/transactions" className="text-blue-500 cursor-pointer hover:font-extrabold">{footerTxt}</a>
                            </div>)
                }}
            />
        </>

    )
}

export default CustomTableColumns
