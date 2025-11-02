import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

export default function Detail() {
    const selectedId = useSelector((state: RootState) => state.accountTransactions.selectedId)
console.log("selectedId",selectedId)
    return (
        <div>{selectedId} </div>
    )
}
