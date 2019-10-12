import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Secured from '../pages/Secured';

import Button from '@material-ui/core/Button';

const App: React.FC = () => {
  return (
    
    <BrowserRouter>
    <div className="container">
      
          <Link to="/" style={{textDecoration:"none"}}><Button variant="contained" color="primary">public component</Button></Link>
          <Link to="/secured" style={{textDecoration:"none"}}><Button variant="contained" color="primary">secured component</Button></Link>

      <Route exact path="/" component={Welcome} />
      <Route path="/secured" component={Secured} />
    </div>
  </BrowserRouter>
  );
}

export default App;