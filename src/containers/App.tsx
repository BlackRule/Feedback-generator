import React from 'react';
import './App.css';
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import Feedback from '../screens/Feedback'
import Tests from "../screens/Tests";

const App:React.FC = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="menu">
					<NavLink to="/">Feedback</NavLink>
					<NavLink to="/tests">Tests</NavLink>
				</div>
				<Route path="/" component={Feedback} exact/>
				<Route path="/tests" component={Tests}/>
			</div>
		</BrowserRouter>
	);
}

export default App;
