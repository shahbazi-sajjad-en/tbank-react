"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { GetAccountDetail } from "src/@api/accounts"

function decryptId(encodedId: string) {
  return Buffer.from(encodedId, "base64").toString("utf-8")
}

export default function AccountDetailPage() {
  const params = useParams()
  const [details, setDetails] = useState([])
  const [decryptedId, setDecryptedId] = useState("")

  useEffect(() => {
    if (params.id) {
      const id = decryptId(params.id)
      setDecryptedId(id)
    }
  }, [params.id])


  const fetchDetails = () => {
    const postedData = {
      accountNumber: decryptedId
    }
    GetAccountDetail(postedData).then((res) => setDetails(res.data)).catch((err) => {
      return err
    })
  }

  useEffect(() => {
    if (decryptedId) {
      fetchDetails()
    }
  }, [decryptedId])


  console.log("dsetails", details)
  return (
    <div>
      <h1>Account Detail Page</h1>
      <p>Decrypted ID: {decryptedId}</p>
    </div>
  )
}
