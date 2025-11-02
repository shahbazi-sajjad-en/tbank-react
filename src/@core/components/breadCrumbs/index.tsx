'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Breadcrumbs, Typography, useTheme } from '@mui/material'
import pathTranslations from 'src/@utils/pathTranslations'

export default function BreadCrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter((segment) => segment)
    const theme = useTheme()
   
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/')
        const label = pathTranslations[segment] || decodeURIComponent(segment)
        const isLast = index === pathSegments.length - 1
        return isLast ? (
            <Typography key={href} style={{}}>
                {label}
            </Typography>
        ) : (
            <Link key={href} href={href} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                {label}
            </Link>
        )
    })

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {pathname != "/" && <Link href="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                خانه
            </Link>}

            {breadcrumbs}
        </Breadcrumbs>
    )
}
