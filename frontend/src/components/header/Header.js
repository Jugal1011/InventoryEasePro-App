import React from 'react'

const Header = () => {
  return (
    <div className='--pad header'>
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">
            Welcome, 
          </span>
          <span style={{color:"#0a1930" , paddingLeft:"10px"}}>
            Jugal Soni
          </span>
        </h3>
        <button style={{backgroundColor: "#0a1930", color:"#ffffff"}} className="--btn" >
          Logout
        </button>
      </div>
      
    </div>
  )
}

export default Header
