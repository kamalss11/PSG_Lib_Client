import {React,useEffect,useState} from  'react'
import {Link,useNavigate} from 'react-router-dom'

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
                <Link to='/edit_profile'>Edit Profile</Link><br />
                <Link to='/logout'>Logout</Link>
                {udata ?    
                    <div> 
                        <p>Name : {udata.name}</p>
                        <p>Email : {udata.email}</p>
                    </div> : ''}
            </div>
        </>
    )
}

export default Profile