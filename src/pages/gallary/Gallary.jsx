import './gallary.css'
import SwiperJs from './Swipper'
import './swiperjs.css'
import gallarydata from './data'
import { Fragment } from 'react'

const Gallary = () => {
  return (
    <div className='gallary'>
      {
        gallarydata.map((g, i) => {
          return (
            <Fragment key={i}>
              <h1>{g.title}</h1>
              <div className="gallary__picnic">
                <SwiperJs picnic={g.images}/>
              </div>
            </Fragment>
          )
        })
      }

    </div>
  )
}

export default Gallary