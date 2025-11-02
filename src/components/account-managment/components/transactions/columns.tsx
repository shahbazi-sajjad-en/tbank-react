import { GridColDef } from "@mui/x-data-grid"
import dayjs from "dayjs"
import "dayjs/locale/fa"
import StatusChip from "src/@core/components/mui/chip/status-chip"
import { getStatusColor } from "src/@utils/get-status-color"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useRouter } from "next/navigation"
import React from "react"

export const transactionColumns = (router: ReturnType<typeof useRouter>): GridColDef[] => [
  // {
  //   field: "rowNumber",
  //   headerName: "#",
  //   width: 70,
  //   headerAlign: "center",
  //   align: "center",
  // },
  {
    field: "transactionType",
    headerName: "نوع تراکنش",
    flex: 2,
    minWidth: 130,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "person",
    headerName: "طرف حساب",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "مبلغ (ریال)",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) =>
      params.value ? params.value.toLocaleString("fa-IR") : "-",
  },
  {
    field: "balance",
    headerName: "مانده حساب (ریال)",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) =>
      params.value ? params.value.toLocaleString("fa-IR") : "-",
  },

  {
    field: "date",
    headerName: "تاریخ تراکنش",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) =>
      dayjs(params?.value).locale("fa").format("YYYY/MM/DD HH:mm"),
  },
  {
    field: "description",
    headerName: "توضیحات",
    flex: 1.5,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "operationCode",
    headerName: "وضعیت تراکنش",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      const isIncoming = params.row.operationCode === "Incoming"
      return (
        <span
          style={{
            color: isIncoming ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {isIncoming ? "واریز" : "برداشت"}
        </span>
      )
    },
  },

  {
    field: "status",
    headerName: "وضعیت نهایی",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <div className="flex mt-3 justify-center gap-2">
        <StatusChip
          label={params.row.status}
          skin="light"
          color={getStatusColor(params.row.status)}
        />
      </div>
    ),
  },
  {
    field: "actions",
    headerName: "عملیات",
    flex: 1.5,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    renderCell: (params: any) => (
      <VisibilityIcon
        className="opacity-60 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
        onClick={() => {
          router.push(`/account-managment/detail/transactions/detail`)
        }}

      />
    ),
  },
]
