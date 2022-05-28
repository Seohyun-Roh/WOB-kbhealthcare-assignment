import { Navigate, Outlet, useLocation } from 'react-router-dom'
import store from 'storejs'

const PrivateRoute = () => {
  const location = useLocation()

  const isUserName = store.get('userName')

  if (!isUserName) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export default PrivateRoute
