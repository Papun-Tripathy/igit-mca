import React from 'react'
import './index.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayVideo from './PlayVideo';
import { Link } from 'react-router-dom';

function index() {
    return (
        <>
            <div className='helpcontent__container'>
                <Link to={'/playvideo'}>
                    <div className="helpcontent">
                        <h3 className='helpcontent__serial'>1</h3>
                        <h3 className='helpcontent__title'>Install GCC</h3>
                        <h3 className='helpcontent__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, magnam placeat? Eligendi, fugiat incidunt iste velit ratione inventore numquam excepturi, maiores commodi vel quidem quos illo cum, magni reiciendis eaque!</h3>
                        <h3 className='helpcontent__btn'><VisibilityIcon /></h3>
                    </div>
                </Link>

            </div>
        </>
    )
}

export default index