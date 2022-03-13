import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
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
                            file: '',
                            user_id: `${udata ? udata.user[0].user_id : ''}`
                        }}
                        enableReinitialize
                        // validationSchema = {
                        //     Yup.object({
                        //         file: Yup.mixed().required('A file is required')
                        //     })
                        // }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                console.log(values)
                                console.log(file)
                                let Data = new FormData()
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
                                <th>Files</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                udata.user.map((e,i)=>{
                                    const {file,status} = e
                                    if(file){
                                        return(
                                            <tr key={i}>
                                                <td>{i+1}</td>
                                                <td>
                                                    <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                                </td>
                                                <td>{status}</td>
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
                        udata && udata.files[0].file ?
                        <table>
                            <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Files</th>
                                <th>Evaluate</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                udata.files.map((e,i)=>{
                                    const {file,status,id} = e
                                    if(file){
                                        return(
                                            <tr ac={id} key={i}>
                                                <td>{i+1}</td>
                                                <td>
                                                    <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                                </td>
                                                <td>
                                                    <form method='PUT'>
                                                        <button onClick={async(e)=>{
                                                            const res = await fetch("/accept_reject",{
                                                                method: "PUT",
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                    id : id,
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
                                                                    id : id,
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
                                                </td>
                                                <td>{status}</td>
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

        </>
    )
}

export default Dashboard