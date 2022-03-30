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
                        <p>The Journal publishes research papers, short communications and commentaries in the areas of with respect to new tools and techniques on physical, chemical, biological sciences and bioinformatics.
Our journal is a fully Open Access journal. Publishing open access offers greater reach and readership for your work, like being cited more, downloaded more and having greater impact.
</p>
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