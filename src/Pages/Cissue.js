import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'
import Menus from '../Components/Menus'

function Cissue(){
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <div className='home'>
            <Homea cissue="active"/>

            <div className="cnt">
                <Menus cissue="active" />

                <div className="msg mn">
                    <h3 className="lhd">Current Issue</h3>
                    <div className="fl">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrumomnisminusunde commodi ipsum est a, dolores sapiente? Labore hic culpadelectusblanditiisdistinctio ratione illum quaerat nisi, corporis libero.Loremipsum dolor sitamet consectetur adipisicing elit. Deserunt autem ad a,absaepe debitisblanditiis nemo id sed cupiditate quae sequi temporacumqueofficiis, sunt harumporro itaque. Culpa.Lorem ipsum dolor, sitametconsectetur adipisicing elit.Nostrum omnis minus unde commodi ipsum esta,dolores sapiente? Labore hic culpadelectus blanditiis distinctiorationeillum quaerat nisi, corporis libero. Loremipsum dolor sit ametconsecteturadipisicing elit. Deserunt autem ad a, ab saepedebitis blanditiisnemo idsed cupiditate quae sequi tempora cumque officiis,sunt harum porroitaque.Culpa.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cissue