// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { ChangeAccountStatus } from 'src/@api/account-detail/change-status'
import CustomButton from 'src/@core/components/button'
import { RootState } from 'src/store'

// ** Types
interface StatusModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isBlock: boolean
    fetchData?: () => void

}

const DetailModal = ({ open, setOpen, isBlock, fetchData }: StatusModalProps) => {
    const [value, setValue] = useState<string>('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const selectedId = useSelector(
        (state: RootState) => state.account.selectedId
    )
    const handleSaveStatus = () => {
        const postedData = {
            accountNumber: selectedId,
            block: isBlock,
            description: value
        }

        ChangeAccountStatus(postedData).then((res) => {
            setOpen(false)
            if (fetchData) {
                fetchData()
            }

            // toast.success("تغییر وضعیت خطا با موفقیت انجام شد.")
        }).catch((err) => {
            setOpen(false)
            toast.error(err)
        })
    }
    const handleClose = () => setOpen(false)
    return (


        <Dialog
            PaperProps={{
                sx: {
                    width: '500px',
                    maxWidth: '90%',
                    borderRadius: 3,
                    p: 1
                }
            }}
            open={open} onClose={handleClose}>
            <DialogTitle id='form-dialog-title'>{isBlock ? "فعالسازی حساب" : "مسدودی حساب"}
            </DialogTitle>
            <DialogContent sx={{ maxWidth: "100%" }}
            >
                <DialogContentText >

                </DialogContentText>
                <TextField size='small' fullWidth label='توضیحات' onChange={handleChange} value={value} />

            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 4 }} className='dialog-actions-dense '>
                <CustomButton variant='outlined' onClick={handleClose} label='انصراف' />
                <CustomButton variant='contained' onClick={handleSaveStatus} label='ثبت' />

            </DialogActions>
        </Dialog>
    )
}

export default DetailModal
