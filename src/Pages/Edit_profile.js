import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import Dash from '../Components/Dash'
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

function Edit_Profile(){
    const [udata,setuData] = useState()
    const [er,setEr] = useState()
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

            if(!datas.error){
                setuData(datas)
            }
            else{
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
            <Homea />

            <div className='d'>
                {
                    udata ? 
                    <Dash page_name="Edit Profile" e_prof='active' udata={udata} /> : 
                    <Dash  />
                }
                <div className='cc'>
                    <div className='prof' style={{boxShadow: 'none',padding:'0'}}>
                        <Formik
                            initialValues = {{
                                email: `${udata ? udata.user[0].email: ''}`,
                                name: `${udata ? udata.user[0].name: ''}`,
                                user_id: `${udata ? udata.user[0].user_id : ''}`
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
                                            hashpassword : `${udata ? udata.password : ''}`
                                        })
                                    })
        
                                    const data = await res.json()
                                    console.log(data)
                                    if(res.status === 400 || !data){
                                        setEr(data.error)
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
                                {er ? <p className='error' style={{color:'#ff0000',textAlign:'left',marginTop:'15px'}}>{er}</p> : null}
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
                </div>
            </div>
        </>
    )
}

export default Edit_Profile