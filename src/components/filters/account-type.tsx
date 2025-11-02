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

    const handleChange = (value) => {
        setType(value)
    }

    return (
        <div>
            <CustomSelect
                label="نوع حساب"
                valueKey="code"
                options={list}
                value={type}
                onChange={handleChange}
                fullWidth
            />
        </div>
    )
}
