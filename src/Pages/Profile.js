import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'
import Dash from '../Components/Dash'

function Profile(){
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
            <div className='nav'>
                <h4>Profile</h4>
            </div>

            <div className='d'>
                {
                    udata ? 
                    <Dash prof='active' udata={udata} /> : 
                    <Dash  />
                }
                <div className='cc'>
                    {udata ?    
                        <div className='prof'> 
                            <p><b>Name :</b> {udata.user[0].name}</p>
                            <p><b>Email :</b> {udata.user[0].email}</p>
                        </div> : ''}
                </div>
            </div>
        </>
    )
}

export default Profile