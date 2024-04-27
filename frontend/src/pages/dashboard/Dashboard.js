import React from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const Dashboard = () => {
  useRedirectLoggedOutUser("/app/login-user");
  return ( 
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
