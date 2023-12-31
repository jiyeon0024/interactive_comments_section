import * as Yup from "yup";

export const loginValidator = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
});

export const commentValidator = Yup.object().shape({
  content: Yup.string().min(0).required("Required"),
});
export const repliesValidator = Yup.object().shape({
  content: Yup.string().min(0).required("Required"),
});
export const editValidator = Yup.object().shape({
  content: Yup.string().min(0).required("Required"),
});
export const replyEditValidator = Yup.object().shape({
  content: Yup.string().min(0).required("Required"),
});
export const repliesEditValidator = Yup.object().shape({
  replies2: Yup.string().min(0).required("Required"),
});
