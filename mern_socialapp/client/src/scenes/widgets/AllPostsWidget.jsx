import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "state/state";
import SinglePostWidget from "./SinglePostWidget";

const AllPostsWidget = ({userID, isProfile = false}) => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const token = useSelector(state => state.token)

    const getAllPosts = async () => {
        const allPostsRes = await fetch(`http://localhost:3795/posts`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const allPostsData = await allPostsRes.json()
        dispatch(setPosts({posts: allPostsData}))
    }

    const getUserPosts = async () => {
        const userPostsRes = await fetch(`http://localhost:3795/posts/${userID}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const userPostsData = await userPostsRes.json()
        dispatch(setPosts({posts: userPostsData}))
    }

    useEffect(()=>{
        isProfile ? getUserPosts() : getAllPosts()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                  _id,
                  userID,
                  firstName,
                  lastName,
                  description,
                  location,
                  picturePath,
                  userPicturePath,
                  likes,
                  comments,
                }) => (
                    <SinglePostWidget
                        key={_id}
                        postID={_id}
                        userID={userID}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
}

export default AllPostsWidget