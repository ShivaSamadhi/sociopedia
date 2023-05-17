import UserModel from "../models/UserModel.js";

//READ
export const getUser = async (req, res) => {
  try{
      const {id} = req.params
      const user = await UserModel.findById(id)
      res.status(200).json(user)
  }
  catch (err) {
      res.status(404).json({ message: err.message})
  }
}

export const getUserFriends = async (req, res) => {
    try{
        const {id} = req.params

        const user = await UserModel.findById(id)

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
        const {id, friendId} = req.params

        const user = await UserModel.findById(id)
        const friend = await UserModel.findById(friendId)

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
            //If friendId exists in user friends list, remove corresponding ID from each users friend arr with filter
        }
        else{
            user.friends.push(friendId)
            friend.friends.push(id)
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