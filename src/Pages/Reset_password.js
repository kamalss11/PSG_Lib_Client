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

function Reset_Password(){
    const [udata,setuData] = useState()
    const navigate = useNavigate()

    // const Credentials = async ()=>{
    //     try{
    //         const res = await fetch('/dashboard',{
    //             method: "GET",
    //             headers: {
    //                 Accept: 'application/json',
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: 'include'
    //         })
    
    //         const datas = await res.json()
    //         console.log(datas)

    //         if(!datas.error){
    //             setuData(datas.user[0])
    //             if(datas.user[0].roll != 'User'){
    //                 navigate('/login')
    //             }
    //             else{
    //                 // navigate('/login')
    //             }
    //         }
    //         else{
    //             console.log(datas.error)
    //             navigate('/login')
    //         }
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }

    // useEffect(()=>{
    //     Credentials()
    // },[])
    return(
        <>
            <div>
                <Formik
                    initialValues = {{
                        password: '',
                        confirm_password: ''
                    }}

                    enableReinitialize
                            
                    validationSchema = {
                        Yup.object({
                            password: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required'),
                            confirm_password: Yup.string()
                                .oneOf(
                                [Yup.ref('password')],
                                'Both password needs to be same'
                                )
                        })
                    }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            console.log(values)
                            const res = await fetch(`/reset_password`,{
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    password : values.password,
                                    confirm_password : values.confirm_password
                                })
                            })

                            const data = await res.json()
                            console.log(data)
                            if(res.status === 400 || !data){
                                alert(data.error)
                                navigate('/forget_password')
                            }
                            else{
                                resetForm(true)
                                navigate('/login')
                            }
                        }, 400);
                    }}
                >
                    <Form method="PUT" className="form">
                        <div>
                            <h3>Reset Password</h3>
                        </div>

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

                        <div className="btn">
                            <button type='submit'>Submit</button>
                        </div>
                    </Form>
                </Formik>    
            </div>
        </>
    )
}

export default Reset_Password