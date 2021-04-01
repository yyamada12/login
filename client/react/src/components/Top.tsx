import React from 'react'

import { useUserContext } from 'contexts/UserStore'

const Top: React.FC = () => {
  const { userId } = useUserContext()

  return (
    <React.Fragment>
      <h1>Top</h1>
      <br />
      userId: {userId}
    </React.Fragment>
  )
}

export default Top
