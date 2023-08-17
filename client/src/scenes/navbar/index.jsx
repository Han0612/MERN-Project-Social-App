import React, { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material"
import { useSelector, useDispatch } from 'react-redux'
import { setMode, setLogout } from 'state'
import { useNavigate } from 'react-router-dom'
import FlexBetween from 'components/FlexBetween'


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  // Check if the screen width is greater than or equal to 1000 pixels
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  // const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            // 当鼠标悬停在这个元素上时，它的文字颜色会变为 primaryLight，并且鼠标指针会变为 "pointer"
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Trendr
        </Typography>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar