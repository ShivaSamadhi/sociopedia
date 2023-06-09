import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {Formik} from "formik";
import * as yup from "yup"
import Dropzone from "react-dropzone";
import {setLogin} from "state/state";
import FlexBetween from "components/FlexBetween";

//Validation Schemas
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName:yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

//Form Initialization
const initialRegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialLoginValues = {
    email: "",
    password: "",
}

const Form = () => {
  const [pageType, setPageType] = useState("login")

  const {palette} = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const isLogin = (pageType === "login");
  const isRegister = (pageType === "register");

  const login = async (values, onSubmitProps) => {

      const loginUserRes = await fetch(
          "http://localhost:3795/auth/login",
          {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(values)
          }
      )

      const loginUser = await loginUserRes.json()
      const {password, ...user} = loginUser.user
      onSubmitProps.resetForm()

      if (loginUser){
          dispatch(
             setLogin({
                 user: user,
                 token: loginUser.token
             })
          )
      }

      console.log(user)
      navigate("/home")
  }

  const register = async (values, onSubmitProps) => {
      //Syntax specifically for sending form data w/ image
      const formData = new FormData()

      for (const value in values) {
          formData.append(value, values[value])
      }
      formData.append("picturePath", values.picture.name)

      const registerUserRes = await fetch(
          "http://localhost:3795/auth/register",
          {
              method: "POST",
              body: formData
          }
      )

      const registerUser = await registerUserRes.json()

      onSubmitProps.resetForm()

      if (registerUser){setPageType("login")}
    }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
      <Formik
          initialValues={isLogin ? initialLoginValues : initialRegisterValues}
          validationSchema={isLogin ? loginSchema : registerSchema}
          onSubmit={handleFormSubmit}
      >
          {
              ({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
              }) => (
                  <form onSubmit={handleSubmit}>

                    {/*Main Form Div*/}
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobileScreen ? undefined : "span 4"}
                        }}
                    >

                        {/*Registration Form*/}
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{gridColumn: "span 2"}}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{gridColumn: "span 4"}}
                                />

                                {/*Dropzone File Div*/}
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles)=>
                                            setFieldValue("picture", acceptedFiles[0])}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{"&:hover": {cursor: "pointer"}}}
                                            >
                                                <input {...getInputProps()}/>
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {values.picture.name}
                                                        </Typography>
                                                        <EditOutlinedIcon/>
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                                {/*Dropzone File Div*/}
                            </>
                        )}
                        {/*Registration Form*/}

                        {/*Login Form*/}
                        <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{gridColumn: "span 4"}}
                        />
                        {/*Login Form*/}

                    </Box>
                    {/*Main Form Div*/}

                    {/*Form Type Div*/}
                    <Box>
                      <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {color: palette.primary.main}
                        }}
                      >
                          {isLogin ? "Login" : "Register"}
                      </Button>
                      <Typography
                        onClick={()=>{
                            setPageType(isLogin ? "register" : "login")
                            resetForm()
                        }}
                        sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover" : {
                                cursor: "pointer",
                                color: palette.primary.light
                            }
                        }}
                      >
                          {isLogin ? "Don't Have An Account? Sign Up Here" : "Have An Account Already? Login Here"}
                      </Typography>
                    </Box>
                    {/*Form Type Buttons*/}

                  </form>
              )}
      </Formik>
  )
}

export default Form