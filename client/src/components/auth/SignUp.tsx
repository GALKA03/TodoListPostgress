"use client";
import * as React from "react";
import { fetchRegister } from "@/app/api";
import { Formik, useFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
} from "@mui/material";
import { error } from "console";

type FormValues = {
  name: string;
  email: string;
  password: string;
};



const SignUp = () => {
  const [value, setValue] = React.useState("user");

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name should be at least 2 characters")
      .max(15, "Name should be at most 15 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .max(10, "Password should be at most 10 characters")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .required("Password is required"),
  });

 const handleSignUp = async (data: FormValues) => {
  console.log("handelSignup register", data);

  try {
    const responseData = await fetchRegister(data.name, data.email, data.password);
console.log('handleSignUpfetch', responseData)
    // Check for error in the message
    if (responseData.message && responseData.message.includes("error")) {
      throw new Error(responseData.message);
    }

    // If there's a user in the response, it's a successful registration
    if (responseData.user) {
      console.log(responseData.message); // "User registered successfully"
      router.push("/auth/login");
    } else {
      // If no user but also no error message, we log an unknown error
      console.error("Signup error:", responseData.message || "Unknown error");
    }

  } catch (error) {
    console.error("Signup error:", error);
  }
};

 
  return (
    <Container component="section" className="pt-8" maxWidth="lg">
  <CssBaseline />
  <Grid container>
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSignUp(values);
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Name"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Email Address"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/auth/login" className="text-black">
                    Do you have an account? Login here
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  </Grid>
</Container>

  );
};

export default SignUp;
