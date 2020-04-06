import React, { Component } from 'react';

import ShopContext from './auth-context';

class GlobalState extends Component {
  


  render() {
    return (
      <ShopContext.Provider>
   
      </ShopContext.Provider>
    );
  }
}

export default GlobalState;