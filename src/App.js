
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import INTROSCREEN from './Components/IntroScreen.jsx';
import HOMESCREEN from './Components/MainHome.jsx';



const App = () => {
  return (
    <Router>
      <div >

        <main >
          {/* <Route path='/' component={INTROSCREEN} exact /> */}
          <Route path='/covidupdates' component={HOMESCREEN} exact />
        </main>

      </div>
    </Router>
  )
}

export default App;
