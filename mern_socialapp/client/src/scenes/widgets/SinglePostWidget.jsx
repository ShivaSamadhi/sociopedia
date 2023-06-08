import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Divider,
    IconButton,
    useTheme
} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPost} from "state/state";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import {useNavigate} from "react-router-dom";

const SinglePostWidget = ({
postID,
userID,
name,
description,
location,
picturePath,
userPicturePath,
likes,
comments,
}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const currentUserID = useSelector(state => state.user._id)
    const isLiked = Boolean(likes[currentUserID])
    const likesCount = Object.keys(likes).length

    const {palette} = useTheme()
    const main = palette.neutral.main
    const primaryMain = palette.primary.main

    const patchLikes = async() => {
        const patchLikesRes = await fetch(`http://localhost:3795/${postID}/likes`)
    }
    return (
        <WidgetWrapper>

        </WidgetWrapper>
    )
}

export default SinglePostWidget