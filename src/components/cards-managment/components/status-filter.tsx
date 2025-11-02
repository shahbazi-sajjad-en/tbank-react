



import { useEffect, useState } from 'react'
import { GetMediaStatusTypes } from 'src/@api/cards/media-status-list'
import CustomSelect from 'src/@core/components/select-box'

export default function StatusFilter({ status, setStatus }) {
    const [list, setList] = useState([])
    const fetchList = () => {
        GetMediaStatusTypes().then((res) => {
            setList(res)
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
