import {PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material"
import {useDispatch, useSelector} from "react-redux";
import {setFriends} from "state/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import {useNavigate} from "react-router-dom";

const Friend = ({friendID, name, subtitle, userPicturePath}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {_id} = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const friends = useSelector(state => state.user.friends)

    const {palette} = useTheme()
    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    // const isFriend = friends.find((friend) => friend._id === friendID)

    const patchFriend = async() => {
        const patchFriendRes = await fetch(`http://localhost:3795/users/${_id}/${friendID}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const patchFriendData = await patchFriendRes.json()
        dispatch(setFriends({friends: patchFriendData}))
    }

    return (
        <FlexBetween>
            <FlexBetween>
                <UserImage image={userPicturePath} size="55px"/>
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendID}`)
                        navigate(0)
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color={medium}
                        fontSize=".75rem"
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx={{backgroundColor: primaryLight, p: ".6rem"}}
            >
                <PersonAddOutlined sx={{color: primaryDark}}/>
                {/*{isFriend ? (<PersonRemoveOutlined sx={{color: primaryDark}}/>) : (<PersonAddOutlined sx={{color: primaryDark}}/>)}*/}
            </IconButton>
        </FlexBetween>
    )
}
export default Friend