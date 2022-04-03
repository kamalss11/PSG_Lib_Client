import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Hamburger from 'hamburger-react'

function Homea(props){
    const [udata,setuData] = useState()
    const [open,Setopen] = useState(false)
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

            if(!datas.error){
                setuData(datas)
            }
            else{
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
                        {udata ? <li><Link to={'/dashboard'}>Dashboard</Link></li> : <li><Link to={'/register'}>Register</Link></li>}
                        {udata ? <li><Link to={'/logout'}>Logout</Link></li> : <li><Link to={'/login'}>Login</Link></li>}
                    </ul>
                </div>
            </div>

            <nav>
                <div className='logo'> 
                    <a target={'_blank'} href={'https://www.psgcas.ac.in/'}><img src={`/Images/logo.png`} /></a>
                </div>

                <ul className={open ? 'active' : ''}>
                    <li className={props.journal ? 'active' : ''}><Link to={'/'}>Journal</Link></li>
                    <li className={props.callp ? 'active' : ''}><Link to={'/call_for_paper'}>Call for Paper</Link></li>
                    <li className={props.author ? 'active' : ''}><Link to={'/author_instructions'}>Author Instructions</Link></li>
                    <li className={props.cissue ? 'active' : ''}><Link to={'/current_issues'}>Current Issues</Link></li>
                    <li className={props.archives ? 'active' : ''}><Link to={'/archives'}>Archives</Link></li>
                </ul>

                <Hamburger onToggle={e=>Setopen(!open)} size={20} duration={0.8} />
            </nav>
        </>
    )
}

export default Homea