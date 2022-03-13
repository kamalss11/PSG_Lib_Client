import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'

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


function Login(){
    const [udata,setuData] = useState()
    const navigate = useNavigate()

    const Credentials = async ()=>{
        try{
            const res = await fetch('/dashboard',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
    
            const datas = await res.json()
            console.log(datas)

            if(!datas.error){
                setuData(datas.user[0])
            }
            else{
                console.log(datas.error)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        Credentials()
    },[])
    return(
        <>
            <Formik
                initialValues = {{
                    email: '',
                    password: ''
                }}
                        
                validationSchema = {
                    Yup.object({
                        email: Yup.string()
                            .email('Invalid Email')
                            .required('Required'),
                        password: Yup.string()
                            .min(4,'Password must be greater than 4 characters')
                            .required('Required')
                    })
                }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            console.log(values)
                            const res = await fetch("/login",{
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email : values.email,
                                    password : values.password
                                })
                            })

                            const data = await res.json()
                            console.log(data)
                            if(res.status === 400 || !data){
                                alert(data.error)
                            }
                            else{
                                resetForm(true)
                                navigate('/dashboard')
                            }
                        }, 400);
                    }}
                >
                    <Form method="POST" className="form">
                            <div>
                                <h3>Login</h3>
                            </div>

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

                            <div className="btn">
                                <button type='submit'>Login</button>
                            </div>
                            <p><Link to='/forget_password'>Forget Password ?</Link></p>
                    </Form>
            </Formik>  
        </>
    )
}

export default Login;