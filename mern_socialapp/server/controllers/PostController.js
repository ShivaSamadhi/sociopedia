import PostModel from "../models/PostModel.js"
import UserModel from "../models/UserModel.js";

//CREATE
export const createPost = async (req, res) => {
    try {
        const {userID, description, picturePath} = req.body
        const user = await UserModel.findById(userID)
        const newPost = new PostModel({
            userID,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save()

        const post = await PostModel.find()

        res.status(201).json(post)
    }
    catch (err) {
        res.status(409).json({ message: err.message })
    }
}

//READ
export const getFeedPosts = async (req, res) => {
    try{
        const post = await PostModel.find()
        res.status(200).json(post)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { userID } = req.params
        const post = await PostModel.find({ userID })
        res.status(200).json(post)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    try{
        const { postID } = req.params
        const { userID } = req.body
        const post = await PostModel.findById(postID)
        const isLiked = post.likes.get(userID)

        if(isLiked){
            post.likes.delete(userID)
        }
        else{
            post.likes.set(userID, true)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            postID,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
