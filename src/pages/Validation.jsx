
import * as Yup from 'yup'


 export const validation=Yup.object({

name:Yup.string().min(3).required("Please enter your name"),
email:Yup.string().email("please enter a valid email").required("Please enter your email"),
password:Yup.string().min(5).required("Please enter your password"),
cpassword:Yup.string()
.oneOf([Yup.ref("password")],"Password not matched")
.required("please confirm your password")

})

