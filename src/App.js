import "./App.css";
import "./Menu";
import Menu from "./Menu";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<div className="App">
				<h1>Agent DashBoard</h1>
				<h6>ILife</h6>
			</div>
			<div className="dropmenu">
				<Menu />
			</div>
		</>
	);
}

export default App;
