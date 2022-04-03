import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import Dash from '../Components/Dash'
import Homea from '../Components/Homea'
import SelectSearch,{fuzzySearch} from 'react-select-search';
import { useRef } from "react";

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
        <label htmlFor={props.id || props.name}>{label}</label><br />
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
    const [r1o,setr1o] = useState(false)
    const [r2,setR2] = useState()
    const [r2o,setr2o] = useState(false)
    const [r1_email,setR1_email] = useState()
    const [r2_email,setR2_email] = useState()
    const [udata,setuData] = useState()
    const [file,setFile] = useState()
    const [admins,setAdmins] = useState()
    const [f1_admin,setf1A] = useState()
    const [f2_admin,setf2A] = useState()
    const [review,setReview] = useState()
    const [rev1_email,setRev1_email] = useState()
    const [rev2_email,setRev2_email] = useState()
    const [rerr,setRerr] = useState()
    const navigate = useNavigate()
    const searchInput = useRef();

    const options = [
      {
        name: 'Kamal',value:'1',email:'kk@'
      },
      {
        name: 'Ka',value:'2',email:'aa@'
      }
    ];
    
    // const handleFilter = (items) => {
    //     return (searchValue) => {
    //       if (searchValue.length === 0) {
    //         return options;
    //       }
    //       const updatedItems = items.map((list) => {
    //         const newItems = list.items.filter((item) => {
    //           return item.name.toLowerCase().includes(searchValue.toLowerCase());
    //         });
    //         return { ...list, items: newItems };
    //       });
    //       return updatedItems;
    //     };
    //   };

    const filter = (searchValue) =>{
        const newItems = admins.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setf1A(newItems);        
    }

    const filter2 = (searchValue) =>{
        const newItems = admins.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setf2A(newItems);        
    }

    // const options = [
    //     {name: 'Swedish', value: 'sv'},
    //     {name: 'English', value: 'en'},
    //     {
    //         type: 'group',
    //         name: 'Group name',
    //         items: [
    //             {name: 'Spanish', value: 'es'},
    //         ]
    //     },
    // ];

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
                    const s = await fetch(`/file/${location.state.id}`,{
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
    async function onAsyncChange(selectedValue) {
        console.log("userSelected value is = ", selectedValue);
    
        // but maybe after some validation done on BE actual value didn't change (equals to previous)
        await new Promise((res) => setTimeout(() => res(), 1000));
    
        console.log(
          "still reusing previous value for SelectSearch = ",
          options[0].email
        );
      }
    return(
        <>
            <Homea />

            <div className='d'>
                {
                    udata ? 
                    <Dash page_name='View / Update Status' dash='active' udata={udata} /> : 
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
                            <div className='register' style={{marginTop:'30px'}}>                                
                                <Formik
                                    initialValues = {{
                                        reviewer1 : `${r1 ? r1 : ''}`,
                                        reviewer2 : `${r2 ? r2 : ''}`,
                                        file_id : file.id,
                                        author : file.name,
                                        title : file.title,
                                        file : file.file,
                                        user_id: location.state.user_id,
                                        status : 'OnProcessing'
                                    }}

                                    enableReinitialize
                            
                                    onSubmit={(values, { setSubmitting,resetForm }) => {
                                        console.log(values,r1_email,r2_email)
                                        setTimeout(async(e)=>{
                                            if(values.reviewer1 === '' || values.reviewer2 === ''){
                                                setRerr('No Reviewers')
                                            }
                                            else if((values.reviewer1 && !values.reviewer2) || (!values.reviewer1 && values.reviewer2)){
                                                setRerr('Select both reviewers')
                                            }
                                            else if(values.reviewer1 === values.reviewer2){
                                                setRerr('Both the reviewers are same')
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
                                                        r1_email : `${r1_email ? r1_email : ''}`,
                                                        r2_email : `${r2_email ? r2_email : ''}`,
                                                        file_id : values.file_id,
                                                        author : values.author,
                                                        title : values.title,
                                                        file : values.file,
                                                        status : values.status,
                                                        user_id : location.state.user_id
                                                    })
                                                })
                                        
                                                const datas = await res.json()
                                                console.log(datas)
                    
                                                if(!datas.error){
                                                setRerr('')
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
                                        <h3>Assign Reviewers</h3>

                                        {rerr ? <p style={{color:'#ff0000',textAlign:'left',marginTop:'15px'}} className='error'>{rerr}</p> : null}
                                        
                                        <div className='select'>
                                            <p>Reviewer 1</p>
                                            <input onKeyDown={e=>setr1o(true)} type={'search'} className='sr' onClick={e=>{setr1o(!r1o)}} onChange={(e)=>filter(e.target.value)} placeholder={'Search Reviewer 1'}>
                                                </input>
                                                {r1 ? <p>Selected : <b>{r1}</b></p> : ''}
                                            <div className={r1o ? 'active option' : 'option'}>
                                                {
                                                    f1_admin ? f1_admin.map((e,i)=>{
                                                        return(
                                                            <p onClick={ee=>{setR1(e.name);setR1_email(e.email);setr1o(!r1o)}} key={i}>{e.name}</p>
                                                        )
                                                    }) : admins.map((e,i)=>{
                                                        return(
                                                            <p onClick={ee=>{setR1(e.name);setR1_email(e.email);setr1o(!r1o)}} key={i}>{e.name}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        
                                        <div className='select'>
                                            <p>Reviewer 2</p>
                                            <input onKeyDown={e=>setr2o(true)} type={'search'} className='sr' onClick={e=>{setr2o(!r2o)}} onChange={(e)=>filter2(e.target.value)} placeholder={'Search Reviewer 2'}>
                                                </input>
                                                {r2 ? <p>Selected : <b>{r2}</b></p> : ''}
                                            <div className={r2o ? 'active option' : 'option'}>
                                                {
                                                    f2_admin ? f2_admin.map((e,i)=>{
                                                        return(
                                                            <p onClick={ee=>{setR2(e.name);setR2_email(e.email);setr2o(!r2o)}} key={i}>{e.name}</p>
                                                        )
                                                    }) : admins.map((e,i)=>{
                                                        return(
                                                            <p onClick={ee=>{setR2(e.name);setR2_email(e.email);setr2o(!r2o)}} key={i}>{e.name}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <div className="btn">
                                            <button type='submit'>Submit</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div> : 
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Reviewer 1</th>
                                            <th>Status (Reviewer 1)</th>
                                            <th>Reviewer 2</th>
                                            <th>Status (Reviewer 2)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{review.r1}</td>
                                            <td>{review.r1_status}</td>
                                            <td>{review.r2}</td>
                                            <td>{review.r2_status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
                                        review.r1_email === udata.user[0].email ?
                                        <>
                                            <td>{review.r1_comment ? review.r1_comment : '-'}</td>
                                            <td>{review.r1_status}</td>
                                        </> : null}

                                        {review.r2_email === udata.user[0].email ?
                                        <>
                                            <td>{review.r2_comment ? review.r2_comment : '-'}</td>
                                            <td>{review.r2_status}</td>
                                        </> : null
                                    }
                                </tr>
                            </tbody>
                        </table>
                        {review.r1_email === udata.user[0].email && review.r1_status === 'OnProcessing' || review.r2_email === udata.user[0].email && review.r2_status === 'OnProcessing' ? 
                        <Formik
                            initialValues = {{
                                comment : '',
                                a_r : ''
                            }}
                                                            
                            validationSchema = {
                                Yup.object({
                                    comment: Yup.string()
                                        .required('Required'),
                                    a_r : Yup.string().required('Required')
                                })
                            }
                            
                            onSubmit={(values, { setSubmitting}) => {
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
                                            file : file.file,
                                            file_id : review.id,
                                            rev1_email : rev1_email,
                                            rev2_email : rev2_email
                                        })
                                    })
                                
                                    const data = await res.json()
                                    console.log(data)
                                    window.location.reload(true)
                                }, 200);
                            }}
                        >
                            <Form method="PUT" className="form sub" style={{marginTop: '50px'}}>
                                <h3>Update Review</h3>
                                <TextArea
                                    name="comment"
                                    type="textarea"
                                    label={"Enter your Comment"}
                                    placeholder="Enter your Comment"
                                />
                            
                                <MySelect
                                    name="a_r"
                                    type="select"
                                    label={"Select the Status"}
                                >
                                    <option value={''}>--Select--</option>
                                    <option value={'Accepted'}>Accepted</option>
                                    <option value={'Rejected'}>Rejected</option>
                                </MySelect>
                            
                                <div className="btn">
                                    <button type='submit'>Submit</button>
                                </div>
                            </Form>
                        </Formik> : null}
                    </> : null
                }
            </div>
        </>
    )
}

export default Assign