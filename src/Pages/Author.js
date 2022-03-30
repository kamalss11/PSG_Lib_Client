import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'
import Menus from '../Components/Menus'

function Author(){
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <div className='home'>
            <Homea author="active"/>

            <div className="cnt">
                <Menus author="active" />

                <div className="msg mn">
                    <h3 className="lhd">Author Instructions</h3>
                    <div className="fl">
                        <p>The name(s) of the author(s)</p>
                        <p>The affiliation(s) of the author(s), i.e. institution, (department), city, (state), country</p>
                        <p>A clear indication and an active e-mail address of the corresponding author</p>
                        <p>If available, the 16-digit ORCID of the author(s)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Author