import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
  const location = useLocation()

  const userName = sessionStorage.getItem('userName')

  if (!userName) {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}

export default PrivateRoute
