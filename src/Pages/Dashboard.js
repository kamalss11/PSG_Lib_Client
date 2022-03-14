import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import SelectSearch from 'react-select-search';
import Axios from 'axios'

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

function Dashboard(){
    const [udata,setuData] = useState()
    const [file,setFile] = useState()
    const [stsU,setStsu] = useState()
    const navigate = useNavigate()
    var st

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
            <Link to='/dashboard'>Dashboard</Link><br />
            <Link to='/profile'>Profile</Link><br />
            <Link to='/logout'>Logout</Link><br />
            {/* USER */}
            {
                udata && udata.user[0].roll === 'User' ?
                <div>
                    <Formik
                        initialValues = {{
                            name: `${udata ? udata.user[0].name : ''}`,
                            title: '',
                            file: '',
                            user_id: `${udata ? udata.user[0].user_id : ''}`
                        }}
                        enableReinitialize
                        validationSchema = {
                            Yup.object({
                                title: Yup.string().required('This field is required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                console.log(values)
                                console.log(file)
                                let Data = new FormData()
                                Data.append('title',values.title)
                                Data.append('name',values.name)
                                Data.append('file',file)
                                Data.append('user_id',values.user_id)
                                
                                Axios.post('http://localhost:3000/user',Data)
                                    .then(res=>console.log(res),setSubmitting(false),
                                        resetForm(),navigate('/dashboard'))
                                    .catch(err=>{console.log(err)})
                            }, 400);
                        }}
                    >
                        <Form method="POST" encType='multipart/form-data' className="form">
                            <TextInput
                                name="title"
                                type="text"
                                label={'Title of the paper'} 
                            />

                            <div className='fields'>
                                <label htmlFor='f'>Select File</label><br />
                                <input id='f' name='file' type='file' onChange={e=>{setFile(e.target.files[0]); console.log(e.target.files[0])}} />
                            </div>

                            <div className="btn">
                                <button type='submit'>Submit</button>
                            </div>
                        </Form>
                    </Formik>
                    {udata && udata.user[0].file ?
                        <table>
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Title of the Paper</th>
                                <th>Files</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                udata.user.map((e,i)=>{
                                    const {file,title} = e
                                    setTimeout(async()=>{
                                        const res = await fetch('/check_status',{
                                            method: "POST",
                                            headers: {
                                                Accept: 'application/json',
                                                "Content-Type": "application/json"
                                            },
                                            credentials: 'include',
                                            body: JSON.stringify({
                                                file: file
                                            })
                                        })         
                                        const data = await res.json()
                                        setStsu(data.message)
                                    },200)
                                    if(file){
                                        return(
                                            <tr key={i}>
                                                <td>{i+1}</td>

                                                <td>{title}</td>

                                                <td>
                                                    <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                                </td>

                                                <td>
                                                    {
                                                        stsU ? stsU : null
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </table>
                    : <p>No Datas</p>}
                </div> : null
            }

            {/* ADMIN */}
            {
                udata && udata.user[0].roll === 'Admin' ?
                <div>
                    {
                        udata && udata.review ?
                        <table>
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Title of the Paper</th>
                                <th>Files</th>
                                <th>Evaluate</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                udata.review.map((re,i)=>{
                                    const {file,title,name,status,id} = re
                                    return(
                                        <tr key={i}>
                                            <td>{i+1}</td>

                                            <td>{name}</td>

                                            <td>{title}</td>

                                            <td>
                                                <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                            </td>

                                            <td>
                                                {udata.files.map((es,i)=>{
                                                    const {file,id,status} = es 
                                                    return(
                                                        <div key={i}>
                                                            {file === re.file ? 
                                                            <form method='PUT'>
                                                                <button onClick={async(e)=>{
                                                                    const res = await fetch("/accept_reject",{
                                                                        method: "PUT",
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            id : re.id,
                                                                            status : 'Accepted'
                                                                        })
                                                                    })
                                                                    const data = await res.json()
                                                                    console.log(data)
                                                                    if(res.status === 400 || !data){
                                                                        alert(data.error)
                                                                    }
                                                                    else{
                                                                        navigate('/dashboard')
                                                                    }
                                                                }}>Accept</button>
                                                                <button onClick={async(e)=>{
                                                                    const res = await fetch("/accept_reject",{
                                                                        method: "PUT",
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            id : re.id,
                                                                            status : 'Rejected'
                                                                        })
                                                                    })
                                                                    const data = await res.json()
                                                                    console.log(data)
                                                                    if(res.status === 400 || !data){
                                                                        alert(data.error)
                                                                    }
                                                                    else{
                                                                        navigate('/dashboard')
                                                                    }
                                                                }}>Reject</button>
                                                            </form>
                                                            : null}
                                                        </div>
                                                    )
                                                })
                                                }
                                            </td>

                                            <td>{re.status}</td>
                                        </tr>
                                    )  
                                })
                            }
                            </tbody>
                        </table>
                    : <p>No Paper Assigned</p>}
                </div> : null
            }

            {/* SUPER ADMIN */}
            {
                udata && udata.user[0].roll === 'SuperAdmin' ?
                <div>
                    {
                        udata.files && udata.admin ? 
                        <table>
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Title of the Paper</th>
                                <th>Files</th>
                                <th>Assign To</th>
                                <th>Assigned To(click to remove)</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                udata.files.map((e,i)=>{
                                    const {file,name,title,id} = e
                                    if(file){
                                        return(
                                            <tr ac={id} key={i}>
                                                <td>{i+1}</td>

                                                <td>{name}</td>

                                                <td>{title}</td>

                                                <td>
                                                    <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                                </td>

                                                {/* Assign */}

                                                <td>{
                                                    udata.admin.map((ea,ind)=>{
                                                        const {name,email} = ea
                                                        return(
                                                            <div key={ind}>
                                                                <form>
                                                            <button onClick={async(el)=>{
                                                                console.log(email,name,file)
                                                                const res = await fetch("/assign",{
                                                                    method: "POST",
                                                                    headers: {
                                                                        'Content-Type': 'application/json'
                                                                    },
                                                                    body: JSON.stringify({
                                                                        email : email,
                                                                        file: file,
                                                                        name: name,
                                                                        title: e.title,
                                                                        status: 'Assigned'
                                                                    })
                                                                })

                                                                const data = await res.json()
                                                                console.log(data)
                                                                if(res.status === 422 || !data){
                                                                    alert(data.error)
                                                                }
                                                                navigate('/dashboard')
                                                            }}>{name}</button>
                                                                </form>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </td>

                                                {/* Reject */}

                                                <td>
                                                    {udata.review ? 
                                                    udata.review.map((er,i)=>{
                                                        const {name,email,file,id} = er
                                                        if(er.file === e.file){
                                                            return(
                                                                <div key={i}>
                                                                    <form method='PUT'>
                                                                <button key={i} 
                                                                onClick={async(e)=>{
                                                                    const res = await fetch("/delete/review",{
                                                                        method: "PUT",
                                                                        headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify({
                                                                            id : id
                                                                        })
                                                                    })
        
                                                                    // const data = await res.json()
                                                                    // console.log(data)
                                                                    // if(res.status === 422 || !data){
                                                                    //     alert(data.error)
                                                                    // }
                                                                    navigate('/dashboard')
                                                                }}>{name}</button>
                                                                    </form>
                                                                </div>
                                                            )
                                                        }
                                                        else{
                                                            // if(i==0){
                                                            //     return(
                                                            //         <p key={i}>None</p>
                                                            //     )
                                                            // }
                                                        }
                                                    }) : <p>None</p>
                                                    }
                                                </td>
                                                
                                                {/* status */}

                                                <td>{udata.review ? 
                                                udata.review.map((r,i)=>{
                                                    const{email,name,id,file,status} = r
                                                    if(e.file === r.file){
                                                        console.log(r.file)
                                                        return(
                                                            <div key={i}><p>{status}</p>
                                                            </div>
                                                        )
                                                    }
                                                    else{
                                                        return(
                                                            <div key={i}><p>Not Assigned</p>
                                                            </div>
                                                        )                                                        
                                                    }
                                                }): <p>Not Assigned</p>}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </table>
                        : <p>No Admins / File is not Uploaded</p>
                    }
                </div> : null
            }

        </>
    )
}

export default Dashboard