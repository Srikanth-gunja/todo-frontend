
import React from 'react';

import Login from './Login';
export const Hoc = (Component) => {

  return(
    class extends React.Component{
       
        render(){
            return(
                <div>
              {/*auth ? */<Component/>/* :  <Login />*/} 
                </div>
            )
        }
    }
  )
}
export default Hoc;