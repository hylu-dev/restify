import './App.css';
import {APIContext} from "./contexts/APIContext";
import {useState} from "react";
import Router from "./components/Routers";

function App() {
  const [players, setPlayers] = useState([])

  return (
    <APIContext.Provider value={{players, setPlayers}}>
        <Router />
    </APIContext.Provider>
  );
}

export default App;
