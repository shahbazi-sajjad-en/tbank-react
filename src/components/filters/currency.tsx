import React, { useEffect, useState } from 'react'
import { GetCurrencyList } from 'src/@api/accounts'
import CustomSelect from 'src/@core/components/select-box'

export default function CurrencyFilter({ currency, setCurrency }) {
    const [list, setList] = useState([])
    const fetchList = () => {
        GetCurrencyList().then((res) => {
            setList(res)
        }).catch((err) => err)
    }
    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>


            <CustomSelect
                label="ارز"
                options={list}
                value={currency}
                onChange={(value) => setCurrency(value)}
                fullWidth
            />
        </div>
    )
}
