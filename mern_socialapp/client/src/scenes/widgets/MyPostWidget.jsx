import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material";
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    ImageOutlined,
    GifBoxOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "state/state";



const MyPostWidget = ({picturePath}) => {
    const dispatch = useDispatch()
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("")
    const [palette] = useTheme()
    const {_id} = useSelector(state => state.user)
    const token = useSelector(state => state.token)


    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium


    return (
        <Box>

        </Box>
    )

}

export default MyPostWidget