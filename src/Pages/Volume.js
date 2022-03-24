import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'
import Menus from '../Components/Menus'

function Volume(){
    const location = useLocation()
    const navigate = useNavigate()
    const [volume,setVolume] = useState()
    console.log(location.state.id)

    const Credentials = async ()=>{
        try{
            const res = await fetch(`/volume/${location.state.id}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
    
            const datas = await res.json()
            if(datas){
                console.log(datas)
                setVolume(datas.volumes)
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
        <div className='home'>
            <Homea archives="active"/>

            <div className="cnt">
                <Menus archives="active" />

                <div className="msg mn">
                    <h3 className="lhd">Volume {volume ? volume[0].volume_no : ''}</h3>

                    {
                        volume ? <div className='volumes'>
                            {
                                volume.map((e,i)=>{
                                    return(
                                        <>
                                            <p><a target={'_blank'} href={`/Uploads/${e.file}`} key={i}>Volume {e.volume_no} - No.{e.no}</a></p>
                                        </>
                                    )
                                })
                            }
                        </div> : <p>No Volumes</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Volume