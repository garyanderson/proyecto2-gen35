import '../components/styles/fallo.css'
import error from '../assets/images/error.png'

const NoLocation = () => {
  return (
    <div className="fallo">
      <img className='error_img' src={error} alt="error" />
        <h1>por favor acepte la localizacion para poder ver los datos climaticos
        del lugan donde estas</h1>
    </div>
  )
}

export default NoLocation