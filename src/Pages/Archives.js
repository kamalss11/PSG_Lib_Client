import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'
import Menus from '../Components/Menus'

function Archives(){
    const location = useLocation()
    const navigate = useNavigate()
    const [volume,setVolume] = useState()
    const [fileC,setFilC] = useState()
    const [volC,setvolCount] = useState()

    const Credentials = async ()=>{
        try{
            const res = await fetch('/archives',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
    
            const datas = await res.json()
            if(datas.volumes){
                setVolume(datas.volumes)
                setFilC(datas.file_count)
                setvolCount(datas.volumeCount)
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
                    <h3 className="lhd">Archives</h3>

                    {
                        volume ? <div className='volumes'>
                            {
                                volume.map((e,i)=>{
                                    return(
                                        <button onClick={ee=>{navigate('/archives/volume',{state:{id:e.volume_no}})}} key={i}>Volume {e.volume_no}</button>
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

export default Archives