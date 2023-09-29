"use client";
import Link from "next/link";
import { fetchLogin } from "@/app/api";
import { Formik, Form, Field, ErrorMessage, FormikHelpers,FieldProps } from "formik";
import * as Yup from "yup";
// import{useAuth} from "../../app/context/AuthContext"
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
} from "@mui/material";

type LoginFormValues = {
  user_email: string;
  user_password: string;
 
};



const Login = () => {
  const router = useRouter();

const LoginSchema = Yup.object().shape({
  user_email: Yup.string().email("Invalid email").required("Email is required"),

  user_password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .max(10, "Password should be at most 10 characters")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .required("Password is required"),
});
  const handleLogin = async (
  values: LoginFormValues,
  formikHelpers: FormikHelpers<LoginFormValues>
) => {
  console.log("Attempting to login...");
  const { setSubmitting, resetForm } = formikHelpers;

  try {
    const responseData = await fetchLogin(values.user_email, values.user_password);

    if (responseData && responseData.token) {
      localStorage.setItem('jwtToken', responseData.token);  // Save token to localStorage
      router.push("/tasks");
      console.log(responseData);
    }
    resetForm();
  } catch (err) {
    console.error("Login error:", err);
    alert("Failed to login. Please check your credentials.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <Container component="section" className="h-screen" maxWidth="lg">
  <CssBaseline />
  <Box sx={{ marginTop: 8 }}>
    <Grid container>
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
            Login
          </Typography>
<Formik
    initialValues={{ user_email: "", user_password: "" }}
    validationSchema={LoginSchema}
    onSubmit={handleLogin}
>
    {({ isSubmitting }) => (
        <Form>
            <Field name="user_email">
    {({ field, meta }: FieldProps<string>) => (
        <TextField
            {...field}
            label="Email Address"
            fullWidth
            required
            margin="normal"
            error={meta.touched && Boolean(meta.error)} // If the field has been touched and there's an error
            helperText={meta.touched ? meta.error : ""} // Display error message when field is touched
        />
    )}
</Field>
            <Field name="user_password">
    {({ field, meta }: FieldProps<string>) => (
        <TextField
            {...field}
            type="password"
            label="Password"
            fullWidth
            required
            margin="normal"
            error={meta.touched && Boolean(meta.error)} // If the field has been touched and there's an error
            helperText={meta.touched ? meta.error : ""} // Display error message when field is touched
        />
    )}
</Field>

            <Button
                type="submit"   // Add the type="submit" 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
            >
                Login
            </Button>
            <Grid container>
                <Grid item>
                    <Link href="/auth/register">Do not have an account? Sign Up</Link>
                </Grid>
            </Grid>
        </Form>
    )}
</Formik>


        </Box>
      </Grid>
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
    </Grid>
  </Box>
</Container>

  );
};

export default Login;
