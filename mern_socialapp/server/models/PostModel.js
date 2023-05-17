import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userID:{
          type: String,
          required: true
        },
        firstName:{
          type: String,
          required: true
        },
        lastName:{
          type: String,
          required: true
        },
        location: String,
        description: String,
        userPicturePath: String,
        picturePath: String,
        likes: {
          type: Map,
          of: Boolean
        },
        comments: {
          type: Array,
          default: []
        }
    },
    {timestamps: true}
)

//DB MODEL
const PostModel = mongoose.model("PostModel", PostSchema)

export default PostModel