import './gallary.css'
import SwiperJs from './Swipper'
import './swiperjs.css'

const Gallary = () => {
  return (
    <div className='gallary'>
      <h1>Picnic Tour</h1>
      <div className="gallary__picnic">
        <SwiperJs/>
      </div>
    </div>
  )
}

export default Gallary