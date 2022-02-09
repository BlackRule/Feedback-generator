import './App.css';
import {Component} from "react";
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import Feedback from '../screens/Feedback'
import Tests from "../screens/Tests";

class App extends Component {
	state = {
	}

	render = () => {
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
}

export default App;
