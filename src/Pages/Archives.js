import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'
import Menus from '../Components/Menus'

function Archives(){
    const location = useLocation()
    const navigate = useNavigate()
    const [volume,setVolume] = useState()
    const [fileC,setFilC] = useState()

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
            console.log(datas)
            setVolume(datas.volumes)
            setFilC(datas.file_count)
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

                    <div className='cc' style={{margin: '0'}}>
                        <table>
                            <thead>
                                <tr>
                                    {
                                        volume ? volume.map((r,i)=>{
                                            if(i+1 === fileC / 5){
                                                return(
                                                    <th key={i}>Volume {i+1}</th>
                                                )
                                            }
                                        })  : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    volume ? <>
                                        {volume.map((e,i)=>{
                                            if(e.volume_no === fileC){
                                                return(
                                                    <tr key={i}>
                                                        <td>
                                                        {
                                                            <a href={`Uploads/${e.file}`}>{e.file}(No - {e.no})</a>
                                                        }</td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </> : null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Archives