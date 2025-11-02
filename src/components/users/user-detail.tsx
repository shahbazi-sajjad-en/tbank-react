"use client"

import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { GetUserDetail } from 'src/@api/users/get-detail'

export default function UserDetail() {
    const userId = localStorage.getItem("selectedUserId")

    const fetchUserData = () => {
        const postedData = {
            username: userId
        }
        GetUserDetail(postedData).then((res) => {
        }).catch(() => {
            toast.error("دریافت اطلاعات کاربر با خطا مواجه شد")
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div>user-detail</div>
    )
}
