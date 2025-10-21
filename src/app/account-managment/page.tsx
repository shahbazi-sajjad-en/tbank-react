// app/accout-managment/page.tsx
import { GetAccountsData } from "src/@api/accounts"
import AccountManagmentDataGrid from "src/components/account-managment"

export default async function AccoutManagmentPage({
  searchParams,
}: {
  searchParams: {
    page?: string
    pageSize?: string
    firstName?: string
    lastName?: string
    accountNumber?: string
  }
}) {
  const pageNumber = Number(searchParams.page ?? 0)
  const pageSize = Number(searchParams.pageSize ?? 10)

  const postedData = {
    firstName: searchParams.firstName ?? null,
    lastName: searchParams.lastName ?? null,
    accountNumber: searchParams.accountNumber ?? null,
    currencyCode: null,
    serialNumber: null,
    pageNumber,
    pageSize,
  }

  let data
  try {
    const res = await GetAccountsData(postedData)
    data = res.data
  } catch (err) {
    data = { count: 0, list: [] }
  }

  return (
    <div>
      <h4>مدیریت حساب‌ها</h4>
      <AccountManagmentDataGrid
        initialData={data}
        initialPagination={{ pageNumber, pageSize }}
      />
    </div>
  )
}
