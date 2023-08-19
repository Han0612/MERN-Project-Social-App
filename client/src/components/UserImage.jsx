import { Box } from "@mui/material"

const UserImage = ({ image, size = "60px"}) => {
    return (
        <Box width={size} height={size}>
            <img 
                style={{ objectFit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                /**If image can't be displayed, browser will display 'user' as alternative text */
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    )
}

export default UserImage