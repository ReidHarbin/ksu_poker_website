import './App.css';
import Home from './pages/Home.js'
import NavBar from './pages/NavBar.js';
import Leaderboard from './pages/Leaderboard.js';

function App() {
  return (
    <div className="App">
      <Home></Home>
      <Leaderboard></Leaderboard>
    </div>
  );
}

export default App;