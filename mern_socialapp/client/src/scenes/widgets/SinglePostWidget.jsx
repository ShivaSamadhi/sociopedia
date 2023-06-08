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
        const patchLikesRes = await fetch(`http://localhost:3795/posts/${postID}/likes`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userID: currentUserID})
        })
        const updatedPost = await patchLikesRes.json()
        dispatch(setPost({post: updatedPost}))
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
               friendID={userID}
               name={name}
               subtitle={location}
               userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem"}}>
                {description}
            </Typography>
            {picturePath && (
                <img
                   width="100%"
                   height="auto"
                   alt="post"
                   style={{
                       borderRadius: ".75rem",
                       marginTop: ".75rem"}}
                   src={`http://localhost:3795/assets/${picturePath}`}/>
            )}
            <FlexBetween
                mt=".25rem"
            >
                <FlexBetween
                    gap="1rem"
                >
                   {/*Likes Section*/}
                   <FlexBetween
                       gap=".3rem"
                   >
                       <IconButton
                            onClick={() => patchLikes()}
                       >
                           {isLiked ? (
                               <FavoriteOutlined sx={{ color: primaryMain}} />
                           ) : (
                               <FavoriteBorderOutlined/>
                               )}
                       </IconButton>
                       <Typography>
                           {likesCount}
                       </Typography>
                   </FlexBetween>

                   {/*Comments Section*/}
                   <FlexBetween gap=".3rem">
                       <IconButton
                           onClick={() => setIsComments(!isComments)}
                       >
                           <ChatBubbleOutlineOutlined/>
                       </IconButton>
                       <Typography>
                           {comments.length}
                       </Typography>
                   </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined/>
                </IconButton>
            </FlexBetween>

            {isComments && (
                <Box mt=".5rem">
                    {comments.map((comment, i) =>(
                        <Box
                            key={`${name}-${i}`}
                        >
                            <Divider/>
                            <Typography sx={{ color: main, m: ".5rem", pl: "1rem"}}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider/>
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default SinglePostWidget