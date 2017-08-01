import React, {Component} from 'react';
import {Link} from 'react-router';

class App extends Component {

    render() {
        return (
            <div>
                <h3>Weather App</h3>
                <li><Link to="/weather">Temperature Min Max</Link></li>
            </div>
        );
    }
}

export default App;
// <li><Link to="/graph">Temperature Graph</Link></li>
