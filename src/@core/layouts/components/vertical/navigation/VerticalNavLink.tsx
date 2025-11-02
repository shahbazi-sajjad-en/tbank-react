import { Box, Chip, ListItem, ListItemButton, ListItemButtonProps, ListItemIcon, Typography } from "@mui/material"
import { margin, styled } from "@mui/system"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ElementType } from "react"
import { hexToRGBA } from "src/@core/utils/hex-to-rgba"
import Translations from "src/layouts/components/Translations"
import UserIcon from "src/layouts/components/UserIcon"

const VerticalNavLink = ({ item, collapsedNavWidth, navigationBorderWidth, navHover, navCollapsed, navVisible, toggleNavVisibility }) => {
  const pathname = usePathname()

  const MenuNavLink = styled(ListItemButton)<
    ListItemButtonProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
  >(({ theme }) => ({
    width: '14.6rem',
    marginLeft: theme.spacing(3.5),
    marginRight: "10rem",
    borderRadius: theme.shape.borderRadius,
    transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
    '&.active': {

      '&, &:hover': {
        boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
        background: `linear-gradient(72.47deg, ${theme.direction === 'ltr' ? "red" : hexToRGBA(theme.palette.primary.main, 0.7)
          } 22.16%, ${theme.direction === 'ltr' ? hexToRGBA(theme.palette.primary.main, 0.7) : theme.palette.primary.main
          } 76.47%)`,
        '&.Mui-focusVisible': {
          background: `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${hexToRGBA(
            theme.palette.primary.dark,
            0.7
          )} 76.47%)`
        }
      },
      '& .MuiTypography-root, & svg': {
        color: `${theme.palette.common.white} !important`
      }
    }
  }))

  const isHome = item.path === "/"
  const isActive = !isHome && pathname.startsWith(item.path)
  const isActiveFinal = isHome ? pathname === "/" : isActive 
   return (
    <MenuNavLink
      className={isActiveFinal ? 'active' : ''}
      sx={{
        py: 3,
        px: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8 : 4,
      }}
    >
      <Link href={item.path ?? "/"} style={{ display: "flex", width: "100%", textDecoration: "none", color: "inherit" }}>
        {item.icon && (
          <ListItemIcon>
            <UserIcon icon={item.icon} />
          </ListItemIcon>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Typography noWrap>
            <Translations text={item.title} />
          </Typography>
          {item.badgeContent && <Chip label={item.badgeContent} color={item.badgeColor || "primary"} />}
        </Box>
      </Link>
    </MenuNavLink>


  )
}

export default VerticalNavLink
