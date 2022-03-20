import {React,useEffect,useState} from  'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Homea from '../Components/Homea'
import Menus from '../Components/Menus'

function Home(){
    const location = useLocation()
    const navigate = useNavigate()
    return(
        <div className='home'>
            <Homea journal="active" />

            <div className="cnt">
                <Menus journal="active" />
    
                <div className="msg mn">
                    <h3 className="lhd">Journal</h3>
                    <div className="fl">
                        <img width="300" height="400" src={`/Images/Journal.jpg`} />
                        <b><p>Dear Colleagues,</p></b>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrumomnisminusunde commodi ipsum est a, dolores sapiente? Labore hic culpadelectusblanditiisdistinctio ratione illum quaerat nisi, corporis libero.Loremipsum dolor sitamet consectetur adipisicing elit. Deserunt autem ad a,absaepe debitisblanditiis nemo id sed cupiditate quae sequi temporacumqueofficiis, sunt harumporro itaque. Culpa.Lorem ipsum dolor, sitametconsectetur adipisicing elit.Nostrum omnis minus unde commodi ipsum esta,dolores sapiente? Labore hic culpadelectus blanditiis distinctiorationeillum quaerat nisi, corporis libero. Loremipsum dolor sit ametconsecteturadipisicing elit. Deserunt autem ad a, ab saepedebitis blanditiisnemo idsed cupiditate quae sequi tempora cumque officiis,sunt harum porroitaque.Culpa.</p>
                    </div>

                    <div className="bce">
                        <p className="ce">- Chief Editor</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home