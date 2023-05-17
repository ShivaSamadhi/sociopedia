import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"

//REGISTER USER
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body
        //Destructure register form

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        //Salt & hash password

        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        })
        //Create new UserModel obj w/ hashed password

        const savedUser = await newUser.save()
        //Save newUser obj

        res.status(201).json(savedUser)
        //Upon successful creation of a UserModel, send back the json obj to frontend
    }
    catch (err){
        res.status(500).json({ error: err.message })
    }
}

//LOGIN USER
export const login = async (req, res) => {
  try{
      const { email, password } = req.body
      //Destructure register form

      const user = await UserModel.findOne({ email: email})
      //Find user based on email

      if(!user)
          return res.status(400).json({ msg: "User Does Not Exist"});

      const isMatch = await bcrypt.compare(password, user.password)
      //Compare passwords with bcrypt

      if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials"})

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //Create session token w/ secret string

      delete user.password
      //Delete password before sending token to frontend for additional security

      res.status(200).json({token, user})
  }
  catch (err){
      res.status(500).json({ error: err.message })
  }
}