"use client"

import { ImNewTab } from "react-icons/im"
import Card from "@mui/material/Card"
import { DataGrid } from "@mui/x-data-grid"
import { faIR } from "@mui/x-data-grid/locales"
import { CardHeader } from "@mui/material"
import CustomPagination from "src/@core/components/custom-pagination"
import { CustomSkeletonOverlay } from "./skeleton"

interface TableColumnsProps {
  columns: any[]
  loading: boolean
  rows: any[]
  rowCount: number
  totalCount: number
  hasPagination?: boolean
  cardTitle?: string
  footerTxt?: string
  pageSize?: number
  pagination: {
    pageNumber: number
    pageSize: number
  }
  setPagination: (val: { pageNumber: number; pageSize: number }) => void
  onPageChange?: (page: number, pageSize: number) => void
}

const TableColumns = ({
  columns,
  rows,
  footerTxt,
  rowCount,
  cardTitle = "",
  hasPagination = true,
  totalCount,
  loading,
  pagination,
  setPagination,
  onPageChange
}: TableColumnsProps) => {

  // Wrapper برای پاس دادن rowCount به Skeleton
  const LoadingOverlay = () => <CustomSkeletonOverlay count={rowCount} />


  return (
    <Card style={{ height: "calc(100vh - 3rem)" }} >
      {cardTitle && <CardHeader title={cardTitle} />}

      <DataGrid
        disableColumnSorting
        disableColumnMenu
        loading={loading && (!rows || rows.length === 0)}
        rows={(rows || []).map((row) => ({
          ...row,
          id: row.id ?? row.number ?? Math.random(),
        }))}
        columns={columns}
        rowCount={rowCount}
        pagination
        paginationMode="server"
        page={pagination?.pageNumber}
        pageSize={pagination?.pageSize}
        onPageChange={(newPage) => {
          setPagination((prev) => ({ ...prev, pageNumber: newPage }))
          onPageChange?.(newPage, pagination.pageSize)
        }}
        localeText={{
          ...faIR.components.MuiDataGrid.defaultProps.localeText,
          toolbarDensity: "تراکم",
          toolbarExport: "خروجی",
          noRowsLabel: "هیچ ردیفی یافت نشد",
        }}
        style={{
          border: "1px solid #d6d6d6",
          background: "white",
          margin: "10px",
          borderRadius: "12px",
          height:"900px"
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
          loadingOverlay: LoadingOverlay,
          footer: () => {
            if (hasPagination && rowCount) {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0.5rem 1rem",
                  }}
                >
                  <CustomPagination
                    page={pagination?.pageNumber}
                    pageSize={pagination?.pageSize}
                    rowCount={rowCount}
                    totalCount={totalCount}
                    client={false}
                    onPageChange={(newPage) => {
                      setPagination((prev) => ({ ...prev, pageNumber: newPage }))
                      onPageChange?.(newPage, pagination.pageSize)
                    }}
                  />

                </div>
              )
            } else if (footerTxt) {
              return (
                <div
                  style={{ padding: "1rem 0", marginBottom: "10px" }}
                  className="flex items-center cursor-pointer gap-2 justify-center"
                >
                  <ImNewTab fontSize="20px" className="text-blue-500" />
                  <a
                    target="_blank"
                    href="/account-managment/detail/transactions"
                    className="text-blue-500 cursor-pointer hover:font-extrabold"
                  >
                    {footerTxt}
                  </a>
                </div>
              )
            } else {
              return null
            }
          },
        }}
      />
    </Card>
  )
}

export default TableColumns
