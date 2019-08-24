import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { UserContext } from '../../App'

function PrivateRoute({ component: Component, ...rest }) {
  const context = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (!context.isLoggedIn()) {
          window.location.href = '/masuk'
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

export default PrivateRoute
