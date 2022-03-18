import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'

function Dash(props){
    console.log(props)
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <div className='dashboard'>
            <p className='title'>Welcome,<br/><span><b>{props.udata ? props.udata.user[0].name : null}</b></span></p>
            <ul className='menus'>   
                <li className={props.dash ? 'active' : ''}><Link to='/dashboard'>Dashboard</Link></li>
                <li className={props.prof ? 'active' : ''}><Link to='/profile'>Profile</Link></li>
                {props.prof || props.e_prof ? 
                <li className={props.e_prof ? 'active' : ''}><Link to='/edit_profile'>Edit Profile</Link></li> : null}
                <li><Link to='/logout'>Logout</Link></li>
            </ul>
        </div>
    )
}

export default Dash