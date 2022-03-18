import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import Dash from '../Components/Dash'

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

const TextArea = ({ label,...props }) => {
    const [field,meta] = useField(props)
    return(
        <div className="fields">
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea {...field} {...props}></textarea>
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

function Assign(){
    const location = useLocation()
    const [r1,setR1] = useState()
    const [r2,setR2] = useState()
    const [r1_email,setR1_email] = useState()
    const [r2_email,setR2_email] = useState()
    const [udata,setuData] = useState()
    const [file,setFile] = useState()
    const [admins,setAdmins] = useState()
    const [review,setReview] = useState()
    const [rev1_email,setRev1_email] = useState()
    const [rev2_email,setRev2_email] = useState()
    const [stsU,setStsu] = useState()
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
                setuData(datas)
                setAdmins(datas.admin)
                if(!location.state){
                    navigate('/dashboard')
                }
                else{
                    console.log(location.state)
                    const s = await fetch(`/file/${location.state}`,{
                        method: "GET",
                        headers: {
                            Accept: 'application/json',
                            "Content-Type": "application/json"
                        },
                        credentials: 'include'
                    })
        
                    const d = await s.json()
                    setFile(d.file[0])
                    if(d.reviews){
                        setReview(d.reviews[0])
                        if(d.reviews[0].r1_email === datas.user[0].email){
                            setRev1_email(d.reviews[0].r1_email)
                        }
                        else if(d.reviews[0].r2_email === datas.user[0].email){
                            setRev2_email(d.reviews[0].r2_email)
                        }
                    }
                    console.log(d)
                    console.log(location.state)
                }
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
            <div className='nav'>
                <h4>Dashboard</h4>
            </div>

            <div className='d'>
                {
                    udata ? 
                    <Dash dash='active' udata={udata} /> : 
                    <Dash  />
                }
            </div>

            <div className='cc'>
                {
                    file && udata.user[0].roll === 'SuperAdmin' ? 
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Author</th>
                                    <th>Title</th>
                                    <th>Uploaded File</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{file.name}</td>
                                    <td>{file.title}</td>
                                    <td><a target={'_blank'} href={`/Uploads/${file.file}`}>{file.file}</a></td>
                                </tr>
                            </tbody>
                        </table>
                        {
                            admins && !review ? 
                            <div className='rev'>
                                <p>Reviewer 1  : {admins ? admins.map((e,i)=>{
                                    return(
                                        <span onClick={ee=>{setR1(e.name);setR1_email(e.email);
                                            const newa = admins.filter((r)=>{
                                                return r.name != e.name
                                            });console.log(e.name);setAdmins(newa)}} key={i}>
                                                {e.name}
                                        </span>
                                    )
                                }) : null} </p>
                                <p>Reviewer 2  : {admins ? admins.map((e,i)=>{
                                    return(
                                        <span onClick={ee=>{setR2(e.name);setR2_email(e.email);
                                            const newa2 = admins.filter((r)=>{
                                                return r.name != e.name
                                            });setAdmins(newa2);console.log(e.name)}} key={i}>
                                                {e.name}
                                        </span>
                                    )
                                }) : null} </p>
                                
                                <Formik
                                    initialValues = {{
                                        reviewer1 : `${r1 ? r1 : ''}`,
                                        reviewer2 : `${r2 ? r2 : ''}`,
                                        r1_email : `${r1_email ? r1_email : ''}`,
                                        r2_email : `${r2_email ?r2_email : ''}`,
                                        file_id : file.id,
                                        author : file.name,
                                        title : file.title,
                                        file : file.file,
                                        status : 'OnProcessing'
                                    }}

                                    enableReinitialize
                            
                                    onSubmit={(values, { setSubmitting,resetForm }) => {
                                        setTimeout(async(e)=>{
                                            if(!r1 || !r2){
                                                console.log('No Reviewer')
                                            }
                                            else{
                                                const res = await fetch('/reviewers',{
                                                    method: "POST",
                                                    headers: {
                                                        Accept: 'application/json',
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({
                                                        reviewer1 : values.reviewer1,
                                                        reviewer2 : values.reviewer2,
                                                        r1_email : values.r1_email,
                                                        r2_email : values.r2_email,
                                                        file_id : values.file_id,
                                                        author : values.author,
                                                        title : values.title,
                                                        file : values.file,
                                                        status : values.status 
                                                    })
                                                })
                                        
                                                const datas = await res.json()
                                                console.log(datas)
                    
                                                if(!datas.error){
                                                    window.location.reload(true)
                                                }
                                                else{
                                                    console.log(datas)
                                                }
                                            }
                                        }, 400);
                                    }}
                                >
                                    <Form method="POST" className="form sub">                
                                        <div className="btn">
                                            <button type='submit'>Submit</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div> : 
                            <>
                                <p><b>Reviewer 1</b> : {review.r1}</p>
                                <p><b>Status</b> : {review.r1_status}</p>
                                <p><b>Reviewer 2</b> : {review.r2}</p>
                                <p><b>Status</b> : {review.r2_status}</p>
                            </>
                        }
                    </> : null
                }

                {
                    file && review && udata.user[0].roll === 'Admin' ? 
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Author</th>   
                                    <th>Title</th>    
                                    <th>Uploaded File</th> 
                                    <th>Comment</th>    
                                    <th>Status</th>                                    
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{review.author}</td>
                                    <td>{review.title}</td>
                                    <td><a target={"_blank"} href={`/Uploads/${review.file}`}>{file.file}</a></td>
                                    {
                                        rev1_email && review.r1_status != 'OnProcessing' || rev2_email && review.r2_status != 'OnProcessing' ? 
                                        <>
                                            {review.r1_email === udata.user[0].email ?
                                            <>
                                                <td>{review.r1_comment}</td>
                                                <td>{review.r1_status}</td>
                                            </> : null}

                                            {review.r2_email === udata.user[0].email ?
                                            <>
                                                <td>{review.r2_comment}</td>
                                                <td>{review.r2_status}</td>
                                            </> : null}
                                        </> : 
                                        <Formik
                                            initialValues = {{
                                                comment : '',
                                                a_r : ''
                                            }}
                                                    
                                            validationSchema = {
                                                Yup.object({
                                                    comment: Yup.string()
                                                        .required('Required')
                                                })
                                            }
                    
                                                onSubmit={(values, { setSubmitting,resetForm }) => {
                                                    setTimeout(async () => {
                                                        console.log(values)
                                                        const res = await fetch("/reviewers",{
                                                            method: "PUT",
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({
                                                                comment : values.comment,
                                                                status : values.a_r,
                                                                file_id : review.id,
                                                                rev1_email : rev1_email,
                                                                rev2_email : rev2_email
                                                            })
                                                        })
                    
                                                        const data = await res.json()
                                                        console.log(data)
                                                        window.location.reload(true)
                                                        if(res.status === 422 || !data){
                                                            alert(data.error)
                                                        }
                                                        else{
                                                            window.location.reload(true)
                                                        }
                                                    }, 200);
                                                }}
                                            >
                                                <Form method="PUT" className="form">
                                                        <TextArea
                                                            name="comment"
                                                            type="textarea"
                                                            placeholder="Enter your Comment"
                                                        />
                    
                                                        <MySelect
                                                            name="a_r"
                                                            type="select"
                                                        >
                                                            <option>--Select--</option>
                                                            <option value={'Accepted'}>Accepted</option>
                                                            <option value={'Rejected'}>Rejected</option>
                                                        </MySelect>
                    
                                                        <div className="btn">
                                                            <button type='submit'>Submit</button>
                                                        </div>
                                                </Form>
                                        </Formik>
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </> : null
                }
            </div>
        </>
    )
}

export default Assign