import dayjs from "dayjs";
import jalali from "dayjs-jalali";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetUsersList } from 'src/@api/users/get-all-users'
import CustomTableColumns from '../datagird/customDataGrid'
import jalaali from "jalaali-js";
import StatusChip from "src/@core/components/mui/chip/status-chip";
import { getStatusColor } from "src/@utils/get-status-color";
import { Card } from "@mui/material";
import { FaRegEye } from "react-icons/fa";

dayjs.extend(jalali);

export default function UsersList() {
    const toJalali = (dateString: string) => {
        if (!dateString) return "-";

        const d = new Date(dateString);
        const { jy, jm, jd } = jalaali.toJalaali(d);
        const pad = (n: number) => n.toString().padStart(2, "0");

        return `${jy}/${pad(jm)}/${pad(jd)}`;
    };
    const [users, setUsers] = useState([])
    const columns = [
        { field: "userId", headerName: "شناسه کاربر", flex: 1, align: "center", headerAlign: "center" },
        { field: "userFullName", headerName: "نام کاربری", flex: 1, align: "center", headerAlign: "center" },
        { field: "nationalCode", headerName: "کد ملی", flex: 1, align: "center", headerAlign: "center" },
        { field: "mobileNumber", headerName: "شماره تماس", flex: 1, align: "center", headerAlign: "center" },
        {
            field: "brithDate", headerName: "تاریخ تولد", flex: 1, align: "center", headerAlign: "center",
            renderCell: (params) => {
                return <div>{toJalali(params.row.brithDate)}</div>
            }

        },
        {
            field: "disabled", headerName: "وضعیت", flex: 1, align: "center", headerAlign: "center",
            renderCell: (params) => (
                <div className="mt-4 flex justify-center">
                    <StatusChip label={params.row.disabled ? "فعال" : "غیرفعال"} skin='light' color={getStatusColor(params.row.disabled ? "فعال" : "غیرفعال")} />
                </div>
            )
        },
        {
            field: "action", headerName: "عملیات", flex: 1, align: "center", headerAlign: "center",
            renderCell: (params) => {
                return <div className="mt-4 flex justify-center">
                    <FaRegEye className="cursor-pointer" onClick={() => {
                        router.push("/users/user-detail")
                        localStorage.setItem("selectedUserId", params.row.userId);
                    }
                    } fontSize="20px" />
                </div>

            }
        },

    ]

    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 10
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true);
            setUsers(prev => ({ ...prev, list: [] }));

            const postedData = {
                // ...pagination,
                // id: null,
                userFullName: null,
                username: null,
                roleTypeCode: null,
                state: null,
                from: 0,
                size: 20
            };

            try {
                const res = await GetUsersList(postedData);
                setUsers({ count: res.count, list: res.list });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };


        fetchData()

        return () => {
            isMounted = false
        }
    }, [pagination])


    return (
        <div>
            <h1 className="mb-4">مدیریت کاربران</h1>
            <Card>
                <CustomTableColumns
                    cardTitle=""
                    totalCount={users.count}
                    columns={columns}
                    loading={loading}
                    rows={users.list}
                    rowCount={users.count}
                    pageSize={pagination.pageSize}
                    onPageChange={(newPage) =>
                        setPagination((prev) => ({ ...prev, pageNumber: newPage }))
                    }
                />
            </Card>

        </div>
    )
}
