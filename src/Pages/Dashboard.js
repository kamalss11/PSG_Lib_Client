import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import Dash from '../Components/Dash'
import Homea from '../Components/Homea'

const TextInput = ({ label,...props }) => {
    const [field,meta] = useField(props)
    return(
        <div className="fields">
            <label htmlFor={props.id || props.name}>{label}</label><br />
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
    const [filee,setFilee] = useState(false)
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
            <Homea />

            <div className='d'>
                {
                    udata ? 
                    <Dash page_name="Dashboard" dash='active' udata={udata} /> : 
                    <Dash  />
                }

                <div className='cc'>
                    {/* USER */}    

                    {
                        udata && udata.user[0].roll === 'User' ?
                        <>
                            <div className='prof' style={{boxShadow: 'none',padding:'0'}}>
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
                                            if(!file){
                                                setFilee(true)
                                            }
                                            else{
                                                let Data = new FormData()
                                                Data.append('title',values.title)
                                                Data.append('name',values.name)
                                                Data.append('file',file)
                                                Data.append('user_id',values.user_id)
                                                
                                                Axios.post('http://localhost:3000/user',Data)
                                                    .then(res=>console.log(res),setSubmitting(false),
                                                        resetForm(),setTimeout(()=>{
                                                            window.location.reload(true)
                                                        },900))
                                                    .catch(err=>{console.log(err)})
                                            }
                                        }, 400);
                                    }}
                                >
                                    <Form  method="POST" encType='multipart/form-data' className="form">
                                        <h3>Journal Submission</h3>
                                        <TextInput
                                            name="title"
                                            type="text"
                                            label={'Title of the paper'} 
                                        />

                                        <div className='fields'>
                                            <label htmlFor='f'>Select File</label><br />
                                            <input id='f' name='file' type='file' onChange={e=>{setFile(e.target.files[0]); console.log(e.target.files[0])}} />
                                            {filee ? <p className='error'>This field is Required</p> : null}
                                        </div>

                                        <div className="btn">
                                            <button type='submit'>Submit</button>
                                        </div>
                                        </Form>
                                </Formik>
                            </div>
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
                                                const {file,title,status,id} = e
                                                
                                                if(file){
                                                    return(
                                                        <tr key={i}>
                                                            <td>{i+1}</td>

                                                            <td>{title}</td>

                                                            <td>
                                                                <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                                            </td>
                                                            
                                                            <td>
                                                                {status}
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                        </tbody>
                                </table>
                            : <p className='no'>No Datas</p>}
                        </> : null
                    }

                        {/* ADMIN */}

                    {
                        udata && udata.user[0].roll === 'Admin' ?
                        <>
                                {
                                    udata && udata.review ?
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Author</th>
                                            <th>Title of the Paper</th>
                                            <th>Update Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            udata.review.map((re,i)=>{
                                                const {file,title,author,status,file_id} = re
                                                return(
                                                    <tr key={i}>
                                                        <td>{i+1}</td>

                                                        <td>{author}</td>

                                                        <td>{title}</td>

                                                        {/* <td>
                                                            <a target='_blank' href={`/Uploads/${file}`}>{file}</a>
                                                        </td> */}

                                                        <td style={{cursor:'pointer',textAlign:'center'}} onClick={e=>{navigate('/dashboard/view',{state:{id:file_id}})}}>
                                                            <button style={{padding: '8px',backgroundColor:"#002e5b",color:'#ffad18'}}>View File</button>
                                                        </td>
                                                    </tr>
                                                )  
                                            })
                                        }
                                        </tbody>
                                    </table>
                                : <p className='nop'>No Paper Assigned</p>}
                        </> : null
                    }

                        {/* SUPER ADMIN */}
                        
                    {
                        udata && udata.user[0].roll === 'SuperAdmin' ?
                        <>
                            {
                                udata.files && udata.admin ? 
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Title of the Paper</th>
                                            <th>Author</th>
                                            <th>Assign</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            udata.files.map((e,i)=>{
                                                const {file,name,title,id,user_id} = e
                                                if(file){
                                                    return(
                                                        <tr ac={id} key={i}>
                                                            <td>{i+1}</td>

                                                            <td>{title}</td>

                                                            <td>{name}</td>

                                                            <td style={{cursor:'pointer',textAlign:'center'}} onClick={e=>{navigate('/dashboard/view',{state:{id:id,user_id:user_id}})}}>
                                                                <button style={{padding: '8px',backgroundColor:"#002e5b",color:'#ffad18'}}>View / Update</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                                : <p className='nop'>No Admins / File is not Uploaded</p>
                            }
                        </> : null
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard