import { useNavigate} from "react-router-dom"
import batchProfilePic from '../images/batchProfilePicture.jpg';
import batchBackground from '../images/batchBackground.jpg';

const BatchColumn = ({id, title, session, isLoading}) => {
  const navigate=useNavigate();
  return (
    <div className={`hero ${isLoading && 'skeleton'}`}
      onClick={()=>{
        navigate('/batch/'+id)
      }}
    >
      {
        !isLoading &&
      <img src={batchBackground} alt="" /> 
      }
      {
        !isLoading && 
      <div className="hero-description-bk"></div>
      }
      <div className={`hero-logo ${isLoading && 'skeleton'}`}>
          {
            !isLoading &&
          <img src={batchProfilePic} alt="" />
          }
      </div>
      <div className="description">
        <p>{title}</p>
      </div>
      <div className="hero-date"><p>{session}</p></div>
      {
        !isLoading &&
          <div className="hero-btn">
            View Details
          </div>
      }
    </div>

  )
}

export default BatchColumn