import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'

function Homea(props){
    console.log(props)
    const [udata,setuData] = useState()
    const location = useLocation()
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
            <div className='hhd'>
                <div className='navs'>
                    <h3>PSG CAS Library</h3>
                    
                    <img src={'/Images/75years.png'} />

                    <ul>
                        <li className={udata ? 'dactive' : ''}><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li className={udata ? 'active' : ''}><Link to={'/register'}>Register</Link></li>
                        <li><Link to={'/login'}>{udata ? 'Logout' : 'Login'}</Link></li>
                    </ul>
                </div>
            </div>

            <nav>
                <div className='logo'> 
                    <a target={'_blank'} href={'https://www.psgcas.ac.in/'}><img src={`/Images/logo.png`} /></a>
                </div>

                <ul>
                    <li className={props.journal ? 'active' : ''}><Link to={'/'}>Journal</Link></li>
                    <li className={props.callp ? 'active' : ''}><Link to={'/call_for_paper'}>Call for Paper</Link></li>
                    <li className={props.author ? 'active' : ''}><Link to={'/author_instructions'}>Author Instructions</Link></li>
                    <li className={props.cissue ? 'active' : ''}><Link to={'/current_issues'}>Current Issues</Link></li>
                    <li className={props.archives ? 'active' : ''}><Link to={'/archives'}>Archives</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Homea