import React from 'react'
import { Redirect } from 'react-router-dom'

import { useUserContext } from 'contexts/UserStore'

const Auth: React.FC = ({ children }): JSX.Element => {
  const { userId } = useUserContext()
  console.log(userId)

  return (
    <React.Fragment>
      {userId ? children : <Redirect to={'/login'} />}
    </React.Fragment>
  )
}

export default Auth
