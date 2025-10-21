"use client"

import { useState } from "react"

// ** MUI Imports
import Card from "@mui/material/Card"
import { DataGrid } from "@mui/x-data-grid"

import { faIR } from "@mui/x-data-grid/locales"
// ** Custom Toolbar
import CustomPagination from "src/@core/components/custom-pagination"
import { CustomSkeletonOverlay } from "./skeleton"



interface TableColumnsProps {
  columns: { any }[]
  loading: boolean
  rows: any[]
  rowCount: number
  totalCount: number
  pageSize?: number
  onPageChange?: (page: number, pageSize: number) => void
}






const TableColumns = ({
  columns,
  rows,
  rowCount,
  totalCount,
  loading,
  pageSize = 10,
  onPageChange
}: TableColumnsProps) => {
  // ** States
  const [page, setPage] = useState<number>(0)




  return (
    <Card style={{ marginTop: "1rem" }}>
      <DataGrid
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
            <div style={{ display: "flex", justifyContent: "flex-start", padding: "0.5rem 1rem" }}>
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
          ),
        }}
      />

    </Card>

  )
}

export default TableColumns
