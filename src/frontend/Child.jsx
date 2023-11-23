import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { setregister } from "../formslice";
import { Box } from "@mui/material";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("username is required"),
  phoneNumber: yup
    .string("Enter your phoneNumber")
    .min(10, "Phone Number should be of minimum 10 characters length")
    .required("phoneNumber is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your firstName")
    .required("firstName is required"),
  lastName: yup.string("Enter your lastName").required("lastName is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirmPassword")
    .required("confirmPassword is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Child = () => {
  // username, phone number, email, firstname, lastname, password, confirm password
  const user = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  console.log(user, "user");

  console.log(user);
  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existUsername = user.some((el) => el.username === values.username);
      const existphoneNumber = user.some(
        (el) => el.phoneNumber === values.phoneNumber
      );
      const existemail = user.some((el) => el.email === values.email);

      if (existUsername || existphoneNumber || existemail) {
        if (existUsername) alert("Username is already exist");
        else if (existphoneNumber) alert("phoneNumber is already exist");
        else if (existemail) alert("email is already exist");
      } else {
        dispatch(setregister(values));
        console.log(values);
      }
    },
  });

  return (
    <div style={{ margin: "10px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Child;
