// ** React Imports

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import dayjs from 'dayjs'
import jalali from "dayjs-jalali"
import TableColumns from '../datagird/dataGrid'
import jalaali from "jalaali-js";


dayjs.extend(jalali);
// ** Types
interface StatusModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isBlock: boolean
    data?: any

}

const toJalali = (dateString: string) => {
    if (!dateString) return "-";

    const d = new Date(dateString);
    const { jy, jm, jd } = jalaali.toJalaali(d);
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${jy}/${pad(jm)}/${pad(jd)}`;
};
const AccountOwnersModal = ({ open, setOpen, isBlock, data }: StatusModalProps) => {


    const columns = [
        { field: "partyName", headerName: "نام", flex: 1 },
        { field: "identifier", headerName: "شناسه شخص", flex: 1 },
        { field: "role", headerName: "نقش", flex: 1 },
        {
            field: "fromDate", headerName: "تاریخ تخصیص نقش", flex: 1,
            renderCell: (params) => {
                return <div>{toJalali(params.row.fromDate)}</div>
            }
        },
        {
            field: "toDate", headerName: "تاریخ خاتمه نقش", flex: 1, editable:true, renderCell: (params) => {
                return <div>{toJalali(params.row.toDate)}</div>
            }
        },



    ];
    // ابتدا داده‌ها را پردازش می‌کنیم
    const groupedRoles = data?.roles?.reduce((acc: any[], curr: any) => {
        // بررسی می‌کنیم آیا partyId قبلا اضافه شده
        const existing = acc.find(item => item.partyId === curr.partyId);
        if (existing) {
            // اگر وجود دارد، نقش جدید را اضافه می‌کنیم
            existing.role += `, ${curr.role}`;
        } else {
            // اگر وجود ندارد، یک رکورد جدید اضافه می‌کنیم
            acc.push({ ...curr, role: curr.role });
        }
        return acc;
    }, []);



    const handleClose = () => setOpen(false)
    return (


        <Dialog

            PaperProps={{
                sx: {
                    width: '1200px', // یا '80%' برای responsive
                    maxWidth: '90%',
                    borderRadius: 3,
                    p: 2,
                },
            }}

            open={open} onClose={handleClose}>
            <DialogTitle id='form-dialog-title'>
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    <TableColumns
                        columns={columns}
                        rows={groupedRoles}
                        rowCount={groupedRoles?.length}
                        totalCount={groupedRoles?.length}
                        loading={false}
                        hasPagination={false}
                    />
                </DialogContentText>

            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 4 }} className='dialog-actions-dense '>
                {/* <CustomTableColumns columns={columns} rows={data?.signTemplate?.memberList} /> */}

            </DialogActions>
        </Dialog>
    )
}

export default AccountOwnersModal
