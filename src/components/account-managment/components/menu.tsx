// ** React Imports
import { MouseEvent, useState, ChangeEvent } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from '@core/components/icon'
import CustomButton from 'src/@core/components/button'
import { RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { BlockBalance } from 'src/@api/account-detail/block-balance'
import { UnBlockBalance } from 'src/@api/account-detail/unblock'

const options = [
    { label: 'مسدودی مبلغ', value: 'block_amount' },
    { label: 'رفع مسدودی', value: 'unblock_amount' }
]

const ITEM_HEIGHT = 48

const ActionMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openModal, setOpenModal] = useState(false)
    const [selectedAction, setSelectedAction] = useState<string | null>(null)
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')

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

    // بستن مودال
    const handleCloseModal = () => {
        setOpenModal(false)
        setAmount('')
        setDescription('')
    }
    const selectedId = useSelector(
        (state: RootState) => state.account.selectedId
    )

    const handleSubmit = () => {

        const postedData = {
            accountNumber: selectedId,
            amount: amount,
            description: description,
        }
        if (selectedAction == "block_amount") {
            BlockBalance(postedData).then((res) => res).catch((err) => err)
        } else {
            UnBlockBalance(postedData).then((res) => res).catch((err) => err)
        }

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
                {options.map(option => (
                    <MenuItem key={option.value} onClick={() => handleMenuSelect(option.value)}>
                        {option.label}
                    </MenuItem>
                ))}
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

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <CustomButton variant='outlined' onClick={handleCloseModal} label='انصراف' />
                    <CustomButton variant='contained' onClick={handleSubmit} label='ثبت' />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ActionMenu
