import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Menus'

function Menus(props){
    return(
        <div className="menus">
            <h4>Menus</h4>
            <ul className="side-menu">                        
                <li className={props.journal ? 'active' : ''}><Link to={'/'}>Journal</Link></li>
                <li className={props.callp ? 'active' : ''}><Link to={'/call_for_paper'}>Call for Paper</Link></li>
                <li className={props.author ? 'active' : ''}><Link to={'/author_instructions'}>Author Instructions</Link></li>
                <li className={props.cissue ? 'active' : ''}><Link to={'/current_issues'}>Current Issues</Link></li>
                <li className={props.archives ? 'active' : ''}><Link to={'/archives'}>Archives</Link></li>
            </ul> 
        </div>
    )
}

export default Menus