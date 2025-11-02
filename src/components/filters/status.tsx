import { useEffect, useState } from 'react'
import { GetStatusList } from 'src/@api/accounts'
import CustomSelect from 'src/@core/components/select-box'

export default function StatusFilter({ status, setStatus }) {
    const [list, setList] = useState([])
    const fetchList = () => {
        GetStatusList().then((res) => {
            setList(res.data)
        }).catch((err) => err)
    }



    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>


            <CustomSelect
                valueKey="code"
                labelKey="description"
                label="وضعیت"
                options={list}
                value={status}
                onChange={(value) => setStatus(value)}
                fullWidth
            />
        </div>
    )
}
