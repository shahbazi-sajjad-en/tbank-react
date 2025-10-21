"use client"

import { Box, Collapse } from "@mui/material"
import { useEffect, useState } from "react"

// ** Custom Components
import { saveAs } from "file-saver"
import { ExportExell, GetAccountsData } from "src/@api/accounts"
import CustomButton from "src/@core/components/button"
import CustomTextField from "src/@core/components/text-fields"
import AccountTypeFilter from "./filters/account-type"
import CurrencyFilter from "./filters/currency"
import StatusFilter from "./filters/status"

export default function FilterAccounts({ setAccountList, setLoading }) {
  const [open, setOpen] = useState(false)

  // state برای هر سلکت
  const [accountType, setAccountType] = useState("")
  const [status, setStatus] = useState("")
  const [currency, setCurrency] = useState("")
  const [identifier, setIdentifier] = useState("")
  const [accountNumber, setAccountNumber] = useState("") // ✅ شماره حساب

  const isFiltered =
    accountType !== "" || status !== "" || currency !== ""

  const handleSetFilter = () => {
    setLoading(true)
    const postedData = {
      firstName: null,
      lastName: null,
      accountNumber: accountNumber || null, // ✅ استفاده از شماره حساب
      currencyCode: currency,
      productCategoryTypeCode: null,
      productCategoryCode: null,
      financialProductTypeCode: accountType,
      accountStatusTypeCode: "",
      pageNumber: 0,
      pageSize: 20,
    }
    setAccountList(prev => ({ ...prev, list: [] }));
    GetAccountsData(postedData)
      .then((res) => {
        setLoading(false)
        setAccountList(res)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      })
  }

  // ✅ Debounced search handler for شناسه شخص
  useEffect(() => {

    if (identifier.length <= 8) return


    const timer = setTimeout(() => {
      const postedData = {
        firstName: null,
        lastName: null,
        identifier: identifier,
        accountNumber: accountNumber,
        currencyCode: currency,
        productCategoryTypeCode: null,
        productCategoryCode: null,
        financialProductTypeCode: accountType,
        accountStatusTypeCode: "",
        pageNumber: 0,
        pageSize: 20,
      }
      setLoading(true)

      GetAccountsData(postedData)
        .then((res) => {
          setLoading(false)
          setAccountList(res)

        })
        .catch((err) => {
          setLoading(false)
          console.error(err)
        })
    }, 500)

    return () => clearTimeout(timer)
  }, [identifier])

  // ✅ Debounced search handler for شماره حساب
  useEffect(() => {
    if (accountNumber.length < 13) return

    const timer = setTimeout(() => {
      const postedData = {
        firstName: null,
        lastName: null,
        identifier: identifier,
        accountNumber: accountNumber,
        currencyCode: currency,
        productCategoryTypeCode: null,
        productCategoryCode: null,
        financialProductTypeCode: accountType,
        accountStatusTypeCode: "",
        pageNumber: 0,
        pageSize: 20,
      }
      setLoading(true)

      GetAccountsData(postedData)
        .then((res) => {
          setLoading(false)
          setAccountList(res)
        })
        .catch((err) => {
          setLoading(false)
          console.error(err)
        })
    }, 500)

    return () => clearTimeout(timer)
  }, [accountNumber])

  const handleSearchUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value.replace(/\D/g, ""))
  }

  const handleSearchAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value.replace(/\D/g, ""))

  }

  // تابع حذف فیلترها
  const handleClearFilters = () => {
    setAccountType("")
    setStatus("")
    setCurrency("")
    setIdentifier("")
    setAccountNumber("")

    // اگر می‌خوای لیست حساب‌ها را هم به حالت اولیه برگردانی:
    const postedData = {
      firstName: null,
      lastName: null,
      accountNumber: null,
      currencyCode: null,
      productCategoryTypeCode: null,
      productCategoryCode: null,
      financialProductTypeCode: null,
      accountStatusTypeCode: "",
      pageNumber: 0,
      pageSize: 20,
    }
    setLoading(true)
    GetAccountsData(postedData)
      .then((res) => {
        setLoading(false)
        setAccountList(res)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      })
  }







  const onExport = async () => {
    try {
      const postedData = {
        accountNumber: accountNumber || null,
        currencyCode: currency || null,
        productCategoryTypeCode: null,
        productCategoryCode: null,
        financialProductTypeCode: accountType || null,
        accountStatusTypeCode: status || null
      };

      // Ensure ExportExell returns a Blob
      const res = await ExportExell(postedData);

      // If using Axios, res.data is already the Blob
      const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Optional: set a filename
      const filename = "report.xlsx";

      // Download using FileSaver
      saveAs(blob, filename);

    } catch (err) {
      console.error("Export failed:", err);
    }
  };


  // const onExport = () => {
  //   const postedData = {
  //     accountNumber: accountNumber,
  //     currencyCode: currency,
  //     productCategoryTypeCode: null,
  //     productCategoryCode: null,
  //     financialProductTypeCode: accountType,
  //     accountStatusTypeCode: status
  //   }
  //   ExportExell(postedData).then((res) => {
  //     console.log("res", res)
  //   }).catch((err) => err)
  // }


  return (
    <div >

      <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", width: "100%" }}>
          <CustomTextField
            type="text"
            onChange={handleSearchAccountNumber}
            value={accountNumber}
            label="جستجو"
            placeholder="جستجوی شماره حساب"
            fullWidth
          />
          <CustomTextField
            type="text"
            label="جستجوی شناسه شخص"
            placeholder=""
            fullWidth
            value={identifier}
            onChange={handleSearchUserId}
          />
        </Box>
        <Box>
          {isFiltered ? (
            <CustomButton
              width="220px"
              className="flex-1"
              onClick={handleSetFilter}
              label="اعمال فیلتر"
              variant="contained"
            />
          ) : (
            <CustomButton
              width="220px"
              onClick={() => setOpen((prev) => !prev)}
              label="فیلترهای پیشرفته"
              variant="contained"

            />
          )}
        </Box>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 3,
            mb: 2,
            mt: 2,
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
            <AccountTypeFilter type={accountType} setType={setAccountType} />
            <CurrencyFilter currency={currency} setCurrency={setCurrency} />
            <StatusFilter status={status} setStatus={setStatus} />


            <div className="mt-2">
              <CustomButton
                disabled={!isFiltered}
                onClick={handleClearFilters}
                label="حذف فیلترها"
                variant="outlined"
              />
            </div>
          </Box>

        </Box>

      </Collapse>
    </div>
  )
}
