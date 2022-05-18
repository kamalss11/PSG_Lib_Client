import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'

function Dash(props){
    const location = useLocation()
    const navigate = useNavigate()
    const [udata,setuData] = useState()
    const [op,setOp] = useState(false)

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
                setuData(datas.user[0])
            }
            else{
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
                <h4>{props.page_name ? props.page_name : ''}</h4>
                <p onClick={e=>setOp(!op)}>Welcome,<span>{udata ? udata.name : ''}</span></p>
                <ul className={op ? 'rnav active' : 'rnav'}>
                    <li className={props.dash ? 'active' : ''}><Link to='/dashboard'><span className="material-icons">dashboard_customize</span> Dashboard</Link></li>                
                    <li className={props.prof ? 'active' : ''}><Link to='/profile'><span className="material-icons">account_box</span>Profile</Link></li>
                    {props.prof || props.e_prof ? 
                    <li className={props.e_prof ? 'active' : ''}><Link to='/edit_profile'><span className="material-icons">edit_note</span>Edit Profile</Link></li> : null}
                    <li><Link to='/logout'><span className="material-icons">logout</span>Logout</Link></li>                
                </ul>
            </div>

            <div className='dashboard'>
                <p className='title'>Welcome,<br/><span><b>{props.udata ? props.udata.user[0].name : null}</b></span></p>
                <ul className='menus'>   
                    <li className={props.dash ? 'active' : ''}><Link to='/dashboard'><span className="material-icons">dashboard_customize</span> Dashboard</Link></li>                
                    <li className={props.prof ? 'active' : ''}><Link to='/profile'><span className="material-icons">account_box</span>Profile</Link></li>
                    {props.prof || props.e_prof ? 
                    <li className={props.e_prof ? 'active' : ''}><Link to='/edit_profile'><span className="material-icons">edit_note</span>Edit Profile</Link></li> : null}
                    <li><Link to='/logout'><span className="material-icons">logout</span>Logout</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Dash