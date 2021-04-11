import React from 'react'
import { Redirect } from 'react-router-dom'

import { useUserContext } from 'contexts/UserStore'

const Auth: React.FC = ({ children }): JSX.Element => {
  const { userId } = useUserContext()
  console.log(userId)

  return <>{userId ? children : <Redirect to="/login" />}</>
}

export default Auth
