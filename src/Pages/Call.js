import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'

function Call(){
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <div className='home'>
            <Homea />

            <div className="cnt">
                <div className="menus">
                    <h4>Menu</h4>
                    <ul className="side-menu">                        
                        <li><Link to={'/'}>Journal</Link></li>
                        <li className='active'><Link to={'/call_for_paper'}>Call for Paper</Link></li>
                        <li><Link to={'/author_instructions'}>Author Instructions</Link></li>
                        <li><Link to={'/current_issues'}>Current Issues</Link></li>
                        <li><Link to={'/archives'}>Archives</Link></li>
                    </ul> 
                </div>

                <div className="msg mn">
                    <h3 className="lhd">Call For Paper</h3>
                    <div className="fl">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrumomnisminusunde commodi ipsum est a, dolores sapiente? Labore hic culpadelectusblanditiisdistinctio ratione illum quaerat nisi, corporis libero.Loremipsum dolor sitamet consectetur adipisicing elit. Deserunt autem ad a,absaepe debitisblanditiis nemo id sed cupiditate quae sequi temporacumqueofficiis, sunt harumporro itaque. Culpa.Lorem ipsum dolor, sitametconsectetur adipisicing elit.Nostrum omnis minus unde commodi ipsum esta,dolores sapiente? Labore hic culpadelectus blanditiis distinctiorationeillum quaerat nisi, corporis libero. Loremipsum dolor sit ametconsecteturadipisicing elit. Deserunt autem ad a, ab saepedebitis blanditiisnemo idsed cupiditate quae sequi tempora cumque officiis,sunt harum porroitaque.Culpa.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Call