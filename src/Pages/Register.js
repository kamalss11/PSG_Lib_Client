import {React,useEffect} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import Homea from '../Components/Homea'

const TextInput = ({ label,...props }) => {
    const [field,meta] = useField(props)
    return(
        <div className="fields">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props}></input>
            {
                meta.touched && meta.error ?(
                    <p className="error">{meta.error}</p>
                ):null
            }
        </div>
    )
}

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="fields">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {
            meta.touched && meta.error ?(
                <p className="error">{meta.error}</p>
            ):null
        }
      </div>
    )
}

function Register(){
    const navigate = useNavigate()
    return(
        <>
            <Homea reg={'active'} />

            <div className='register'>
                <Formik
                    initialValues = {{
                        name: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                        roll: ''
                    }}
                            
                    validationSchema = {
                        Yup.object({
                            name: Yup.string()
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid Email')
                                .required('Required'),
                            password: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required'),
                            confirm_password: Yup.string()
                                .oneOf(
                                [Yup.ref('password')],
                                'Both password needs to be same'
                                ),
                            roll : Yup.string().required('Required')
                        })
                    }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                const res = await fetch("/",{
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        name: values.name,
                                        email : values.email,
                                        password : values.password,
                                        cpassword: values.confirm_password,
                                        roll: 'User'
                                    })
                                })

                                const data = await res.json()
                                if(res.status === 422 || !data){
                                    alert(data.error)
                                }
                                else{
                                    navigate('/login')
                                }
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Register</h3>

                            <TextInput
                                name="name"
                                type="text"
                                placeholder="Enter your Name"
                            />

                            <TextInput
                                name="email"
                                type="text"
                                placeholder="Enter your Email"
                            />

                            <TextInput
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                            />

                            <TextInput
                                name="confirm_password"
                                type="password"
                                placeholder="Re-enter Password"
                            />

                            {/* <MySelect
                                name="roll"
                                type="select"
                            >
                                <option>--Select--</option>
                                <option value={'User'}>User</option>
                                <option value={'Admin'}>Admin</option>
                                <option value={'SuperAdmin'}>SuperAdmin</option>
                            </MySelect> */}

                            <div className="btn">
                                <button type='submit'>Register</button>
                            </div>
                            <p>Already have an account ? <Link to={'/login'}>Login</Link></p>
                        </Form>
                </Formik>  
            </div>
        </>
    )
}

export default Register;