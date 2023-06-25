import 'react-toastify/dist/ReactToastify.css'
import './ToastContainer.scss'
import { ToastContainer as ToastifyToastContainer } from 'react-toastify'

export const ToastContainer: React.FC = () => {
  return (
    <ToastifyToastContainer
      autoClose={4000}
      pauseOnHover={false}
      position='bottom-right'
      hideProgressBar={false}
    />
  )
}
