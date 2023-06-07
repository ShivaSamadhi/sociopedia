import Navbar from "scenes/navbar/navbar";
import {Box, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
  const {_id, picturePath} = useSelector((state) => state.user)


  return (
      <Box>
          <Navbar/>

          {/*Main Body*/}
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreen ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >

            {/*User Widget*/}
            <Box
               flexBasis={isNonMobileScreen ? "26%" : undefined}
            >
                <UserWidget userId={_id} picturePath={picturePath}/>
            </Box>
            {/*User Widget*/}

            {/*Posts Widget*/}
            <Box
               flexBasis={isNonMobileScreen ? "42%" : undefined}
               mt={isNonMobileScreen ? undefined : "2rem"}
            >
                <MyPostWidget picturePath={picturePath}/>
            </Box>
            {/*Posts Widget*/}

            {/*Friends Widget */}
              {isNonMobileScreen &&
                  <Box flexBasis="26%">

                  </Box>}
            {/*Friends Widget */}

          </Box>
          {/*Main Body*/}
      </Box>
  )
}

export default HomePage