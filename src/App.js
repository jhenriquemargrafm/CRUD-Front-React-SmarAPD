import './App.css';
import {Home} from './Home';
import {Candidate} from './Candidate';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       SmarAPD - CRUD React - .NET - SQL
     </h3>

     <Navigation/>

     <Routes>
       <Route path='/' element={<Home/>} exact/>
       <Route path='/candidate' element={<Candidate/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
