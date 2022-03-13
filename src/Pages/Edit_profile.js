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

function Edit_Profile(){
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
                navigate('/login')
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
            <div>
                <Link to='/dashboard'>Dashboard</Link><br />
                <Link to='/profile'>Profile</Link><br />
                <Link to='/change_profile'>Edit Profile</Link><br />
                <Link to='/logout'>Logout</Link>
                <Formik
                    initialValues = {{
                        email: `${udata ? udata.email: ''}`,
                        name: `${udata ? udata.name: ''}`,
                        user_id: `${udata ? udata.user_id : ''}`
                    }}

                    enableReinitialize
                            
                    validationSchema = {
                        Yup.object({
                            email: Yup.string()
                                .email('Invalid Email')
                                .required('Required'),
                            name: Yup.string()
                                .required('Required'),
                        })
                    }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            console.log(values)
                            const res = await fetch(`/edit_profile/${values.user_id}`,{
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email : values.email,
                                    name : values.name
                                })
                            })

                            const data = await res.json()
                            console.log(data)
                            if(res.status === 400 || !data){
                                alert(data.error)
                            }
                            else{
                                resetForm(true)
                                navigate('/profile')
                            }
                        }, 400);
                    }}
                >
                    <Form method="PUT" className="form">
                        <div>
                            <h3>Edit Profile</h3>
                        </div>

                        <TextInput
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                        />

                        <TextInput
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                        />

                        <div className="btn">
                            <button type='submit'>Update</button>
                        </div>
                    </Form>
                </Formik>                 

                <Formik
                    initialValues = {{
                        password: '',
                        cpassword: '',
                        ppassword: ``,
                        user_id: `${udata ? udata.user_id : ''}`
                    }}

                    enableReinitialize       

                    validationSchema = {
                        Yup.object({
                            password: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required'),

                            cpassword: Yup.string()
                                .oneOf(
                                [Yup.ref('password')],
                                'Both password needs to be same'
                                ),

                            ppassword: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required')
                        })
                    }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            console.log(values)
                            const res = await fetch(`/edit_profile/${values.user_id}`,{
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    password : values.password,
                                    cpassword : values.cpassword,
                                    ppassword : values.ppassword,
                                    hashpassword : udata.password
                                })
                            })

                            const data = await res.json()
                            console.log(data)
                            if(res.status === 400 || !data){
                                alert(data.error)
                            }
                            else{
                                resetForm(true)
                                navigate('/logout')
                            }
                        }, 400);
                    }}
                >
                    <Form method="PUT" className="form">
                        <h3>Change Password</h3>
                        <TextInput
                            id="ppassword"
                            name="ppassword"
                            type="password"
                            placeholder="Enter old password"
                        />

                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter new password"
                        />

                        <TextInput 
                            id="cpassword"
                            name="cpassword"
                            type="password"
                            placeholder="Re-enter password"
                        />  

                        <div className="btn">
                            <button type='submit'>Update</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default Edit_Profile