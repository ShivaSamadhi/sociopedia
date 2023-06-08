import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

//READ
export const getUser = async (req, res) => {
  try{
      const {userID} = req.params
      const user = await UserModel.findById(userID)
      res.status(200).json(user)
  }
  catch (err) {
      res.status(404).json({ message: err.message})
  }
}

export const getUserFriends = async (req, res) => {
    try{
        const {userID} = req.params

        const user = await UserModel.findById(userID)

        const friends = await Promise.all(
            user.friends.map((id) => UserModel.findById(id))
        )
        //Map over the friends arr within the user obj, find all friends based on ID, return all as promise arr

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })
        //Map over and destructure all users in friends arr and return the new obj

        res.status(200).json(formattedFriends)
    }
    catch (err) {
        res.status(404).json({ message: err.message})
    }
}

//UPDATE
export const addRemoveFriend = async (req, res) => {
    try{
        const {userID, friendID} = req.params

        const user = await UserModel.findById(userID)
        const friend = await UserModel.findById(friendID)

        if(user.friends.includes(friendID)){
            user.friends = user.friends.filter((id) => id !== friendID)
            friend.friends = friend.friends.filter((id) => id !== userID)
            //If friendId exists in user friends list, remove corresponding ID from each users friend arr with filter
        }
        else{
            user.friends.push(friendID)
            friend.friends.push(userID)
            //If friendId does not exists in user friends list, add corresponding ID to each users friend arr with push
        }

        await user.save()
        await friend.save()
        //Save updated objects

        const friends = await Promise.all(
            user.friends.map((id) => UserModel.findById(id))
        )
        //Map over the friends arr within the user obj, find all friends based on ID, return all as promise arr

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            })
        //Map over and destructure all users in friends arr and return the new obj

        res.status(200).json(formattedFriends)
    }
    catch (err) {
        res.status(404).json({ message: err.message})
    }
}

// export const updatePassword = async (req, res) =>{
//     try{
//         const {id} = req.params
//         const {password, updatePassword} = req.body
//
//         const user = await UserModel.findById(id)
//
//         if(!user)
//             return res.status(400).json({ msg: "User Does Not Exist"});
//
//         const isMatch = await bcrypt.compare(password, user.password)
//
//         if(!isMatch)
//             return res.status(400).json({ msg: "Invalid Credentials"})
//
//         const salt = await bcrypt.genSalt()
//         const passwordHash = await bcrypt.hash(updatePassword, salt)
//         const updatedPassword = {password: passwordHash}
//
//         const updatedUser = await UserModel.findByIdAndUpdate(
//             id,
//             updatedPassword,
//             {new: true},
//             (err, model) => {
//                 if(err)
//                     console.log(err)
//                 console.log(`Updated User: ${model}`)
//             }
//             )
//     }
//     catch (e) {
//
//     }
// }