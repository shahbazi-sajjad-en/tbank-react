"use client"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import CustomButton from "src/@core/components/button"
import CustomTextField from "src/@core/components/text-fields"
import AccountTypeFilter from "../filters/account-type"
import CurrencyFilter from "../filters/currency"
import StatusFilter from "../filters/status"

export default function FilterAccounts({ onFilterApply, loading }) {
  const [accountType, setAccountType] = useState("")
  const [status, setStatus] = useState("")
  const [currency, setCurrency] = useState("")
  const [identifier, setIdentifier] = useState("")
  const [accountNumber, setAccountNumber] = useState("")

  // برای debounce جداگانه
  useEffect(() => {
    if (!identifier && !accountNumber) return
    const timer = setTimeout(() => {
      const filters = {
        identifier: identifier || null,
        accountNumber: accountNumber || null,
        currencyCode: currency || null,
        financialProductTypeCode: accountType || null,
        accountStatusTypeCode: status || null,
      }
      onFilterApply(filters)
    }, 500)
    return () => clearTimeout(timer)
  }, [identifier])

  useEffect(() => {
    if (!identifier && !accountNumber) return
    const timer = setTimeout(() => {
      const filters = {
        identifier: identifier || null,
        accountNumber: accountNumber || null,
        currencyCode: currency || null,
        financialProductTypeCode: accountType || null,
        accountStatusTypeCode: status || null,
      }
      onFilterApply(filters)
    }, 500)
    return () => clearTimeout(timer)
  }, [accountNumber])

  const isFiltered =
    accountType ||
    status  ||
    currency  ||
    accountNumber  ||
    identifier 

  const handleSetFilter = () => {
    const filters = {
      identifier: identifier || null,
      accountNumber: accountNumber || null,
      currencyCode: currency || null,
      financialProductTypeCode: accountType || null,
      accountStatusTypeCode: status || null,
    }
    onFilterApply(filters)
  }

  const handleClearFilters = () => {
    setAccountType("")
    setStatus("")
    setCurrency("")
    setIdentifier("")
    setAccountNumber("")
    onFilterApply({})
  }

  return (
    <div>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", width: "100%" }}>
        <CustomTextField
          type="text"
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
          value={accountNumber}
          label="جستجوی شماره حساب"
          fullWidth
        />
        <CustomTextField
          type="text"
          label="جستجوی شناسه شخص"
          fullWidth
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, ""))}
        />
      </Box>

      <div className="mt-4 flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <AccountTypeFilter type={accountType} setType={setAccountType} />
          <CurrencyFilter currency={currency} setCurrency={setCurrency} />
          <StatusFilter status={status} setStatus={setStatus} />
        </div>

        <div className="mt-2 gap-3 flex items-center">
          <CustomButton
            color="error"
            disabled={!isFiltered || loading}
            onClick={handleClearFilters}
            label={"حذف فیلتر"}
            variant="outlined"
          />
          <CustomButton
            onClick={handleSetFilter}
            label="اعمال فیلتر"
            disabled={loading}
            variant="contained"
          />
        </div>
      </div>
    </div>
  )
}
