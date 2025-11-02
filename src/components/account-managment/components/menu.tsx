// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'

// ** Icon Imports
import Icon from '@core/components/icon'
import { useSelector } from 'react-redux'
import { BlockBalance } from 'src/@api/account-detail/block-balance'
import { UnBlockBalance } from 'src/@api/account-detail/unblock'
import CustomButton from 'src/@core/components/button'
import { RootState } from 'src/store'
import toast from 'react-hot-toast'

const options = [
    { label: 'مسدودی مبلغ', value: 'block_amount' },
    { label: 'رفع مسدودی', value: 'unblock_amount' }
]

const ITEM_HEIGHT = 48

const ActionMenu = ({ refetchData, blockedBalance }: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openModal, setOpenModal] = useState(false)
    const [selectedAction, setSelectedAction] = useState<string | null>(null)
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')

    const selectedId = useSelector((state: RootState) => state.account.selectedId)

    // باز کردن منو
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    // بستن منو و باز کردن مودال
    const handleMenuSelect = (value: string) => {
        setSelectedAction(value)
        setAnchorEl(null)
        setOpenModal(true)
    }


    function faToEnNumber(faNumber: string) {
        return faNumber.replace(/[۰-۹]/g, (d) =>
            String(d.charCodeAt(0) - '۰'.charCodeAt(0))
        )
    }

    // بستن مودال
    const handleCloseModal = () => {
        setOpenModal(false)
        setAmount('')
        setDescription('')
    }

    // ثبت
    const handleSubmit = () => {
        const postedData = {
            accountNumber: selectedId,
            amount,
            description
        }

        const action =
            selectedAction === 'block_amount'
                ? BlockBalance
                : UnBlockBalance

        action(postedData)
            .then(() => {
                refetchData({ accountNumber: selectedId });
                toast.success("عملیات با موفقیت انجام شد");
            })
            .catch((err: any) => {
                const msg =
                    err?.response?.data?.translate ||
                    err?.response?.data?.message ||
                    "خطا در انجام عملیات";
                toast.error(msg);
            });

        setOpenModal(false)
    }

    return (
        <div>
            {/* دکمه منو */}
            <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
                <Icon icon='tabler:dots-vertical' />
            </IconButton>

            {/* منو */}
            <Menu
                keepMounted
                id='long-menu'
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                PaperProps={{
                    style: { maxHeight: ITEM_HEIGHT * 4.5 }
                }}
            >
                {options.map((option) => {
                    const isDisabled = option.value === "unblock_amount" && Number(faToEnNumber(blockedBalance).replace(/,/g, '')) === 0

                    return (
                        <MenuItem
                            key={option.value}
                            onClick={() => !isDisabled && handleMenuSelect(option.value)}
                            disabled={isDisabled}
                            sx={{
                                opacity: isDisabled ? 0.5 : 1,
                                cursor: isDisabled ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {option.label}
                        </MenuItem>
                    )
                })}
            </Menu>

            {/* مودال */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                PaperProps={{
                    sx: { width: 400, maxWidth: '90%' }
                }}
            >
                <DialogTitle>
                    {selectedAction === 'block_amount' ? 'مسدودی مبلغ' : 'رفع مسدودی'}
                </DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                    <TextField
                        InputProps={{
                            endAdornment: <span style={{ marginLeft: 8, color: '#666' }}>ریال</span>
                        }}
                        size='small'
                        label='مقدار'
                        value={amount}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label='توضیحات'
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                        fullWidth
                    />
                </DialogContent>

                {/* <div className='px-8 py-4 '>
                    <Divider sx={{ color: 'gray' }} className='!opacity-40' />
                </div> */}

                <DialogActions>
                    <CustomButton width='50' variant='outlined' onClick={handleCloseModal} label='انصراف' />
                    <CustomButton width='50' variant='contained' onClick={handleSubmit} label='ثبت' />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ActionMenu
