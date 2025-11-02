import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

export default function AccountCardsManagment() {

    const selectedId = useSelector(
        (state: RootState) => state.account.selectedId
    )

    return (
        <div>accountCardsManagment</div>
    )
}
