import React from 'react'

import { useUserContext } from 'contexts/UserStore'

import 'style/top.css'

const Top: React.FC = () => {
  const { userId } = useUserContext()

  return (
    <>
      <h1 className="topTitle">Login Smaple App</h1>
      <p className="topText">あなたのIDは {userId} です！</p>
    </>
  )
}

export default Top
