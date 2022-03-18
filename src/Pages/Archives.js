import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'

function Archives(){
    const location = useLocation()
    const navigate = useNavigate()
    const [volume,setVolume] = useState()

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
            <Homea />

            <div className="cnt">
                <div className="menus">
                    <h4>Menu</h4>
                    <ul className="side-menu">                        
                        <li><Link to={'/'}>Journal</Link></li>
                        <li><Link to={'/call_for_paper'}>Call for Paper</Link></li>
                        <li><Link to={'/author_instructions'}>Author Instructions</Link></li>
                        <li><Link to={'/current_issues'}>Current Issues</Link></li>
                        <li className='active'><Link to={'/archives'}>Archives</Link></li>
                    </ul> 
                </div>

                <div className="msg mn">
                    <h3 className="lhd">Archives</h3>

                    <div className='cc' style={{margin: '0'}}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Volume 1</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    volume ? <>
                                        {volume.map((e,i)=>{
                                            return(
                                                <tr key={i}>
                                                    {
                                                        e.volume_no === 1 ?<td>
                                                        <a href={`Uploads/${e.file}`}>{e.file}_No.{i+1}</a></td> : null
                                                    }
                                                </tr>
                                            )
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