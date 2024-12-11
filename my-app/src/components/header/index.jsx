"use client"

import Link from "next/link";

const Header = () => {
    return(
        <div style={{width: "20vw", height: "100vh",backgroundColor: "rgb(100,199,199)", }}>
    
        <div style={{
            height: "80vh", 
        }} >
        
          <div style={{marginTop: "10vh"}} >    
                <Link href="/">
                <h1>Publicar Empleo</h1>
                </Link>  
          </div>

            <div style={{marginTop: "10vh"}}>
                <Link
                  href="/"
                >
                  <h1>Publicar Empleo</h1>
                </Link>
            </div>

            <div style={{marginTop: "10vh"}}>           
                <Link
                  href="/"
                >
                  <h1>Publicar Empleo</h1>
                </Link>
            </div>

            <div style={{marginTop: "10vh"}}> 
               <Link
                  href="/"
                >
                  <h1>Publicar Empleo</h1>
                </Link>
            </div>
            </div>
          </div>
    )
}
export default Header;