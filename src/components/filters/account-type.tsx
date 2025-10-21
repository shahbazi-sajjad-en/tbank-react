import { useEffect, useState } from 'react'
import { GetAccountTypeList } from 'src/@api/accounts'
import CustomSelect from 'src/@core/components/select-box'

export default function AccountTypeFilter({ type, setType }) {
    const [list, setList] = useState([])
    const fetchList = () => {
        GetAccountTypeList().then((res) => {
            setList(res)
        }).catch((err) => err)
    }

    useEffect(() => {
        fetchList()
    }, [])
    const handleChange = (value :string | number) => {
        setType(value)
        console.log(value)
    }
    return (
        <div>
            <CustomSelect
                label="نوع حساب"
                options={list}
                value={type}
                onChange={handleChange}
                fullWidth
            />
        </div>
    )
}
