import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'

function Dash(props){
    console.log(props)
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <>
            <div className='nav'>
                <h4>{props.page_name ? props.page_name : ''}</h4>
            </div>

            <div className='dashboard'>
                <p className='title'>Welcome,<br/><span><b>{props.udata ? props.udata.user[0].name : null}</b></span></p>
                <ul className='menus'>   
                    <li className={props.dash ? 'active' : ''}><Link to='/dashboard'><span class="material-icons">dashboard_customize</span> Dashboard</Link></li>
                    <li className={props.prof ? 'active' : ''}><Link to='/profile'><span class="material-icons">account_box</span>Profile</Link></li>
                    {props.prof || props.e_prof ? 
                    <li className={props.e_prof ? 'active' : ''}><Link to='/edit_profile'><span class="material-icons">edit_note</span>Edit Profile</Link></li> : null}
                    <li><Link to='/logout'><span class="material-icons">logout</span>Logout</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Dash