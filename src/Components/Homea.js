import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'

function Homea(props){
    console.log(props)
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <>
            <h3 className='hhd'>PSG CAS Library</h3>
            <nav>
                <div className='logo'><img src={`/Images/logo.png`} /></div>
                <ul>
                    <li><Link to={'/'}>Journal</Link></li>
                    <li><Link to={'/call_for_paper'}>Call for Paper</Link></li>
                    <li><Link to={'/author_instructions'}>Author Instructions</Link></li>
                    <li><Link to={'/current_issues'}>Current Issues</Link></li>
                    <li><Link to={'/archives'}>Archives</Link></li>
                    <li className={props.reg ? 'active' : ''}><Link to={`/register`}>Register</Link></li>
                    <li className={props.log ? 'active' : ''}><Link to={`/login`}>Login</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Homea