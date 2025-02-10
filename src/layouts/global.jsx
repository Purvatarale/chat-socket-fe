import React from 'react'

const GlobalLayout = ({children}) => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden max-h-[100vh] max-w-[100vw]">{children}</div>
  )
}

export default GlobalLayout