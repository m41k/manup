import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UpdateList from './components/UpdateList';
import ScheduleForm from './components/ScheduleForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={UpdateList} />
                    <Route path="/schedule" component={ScheduleForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
