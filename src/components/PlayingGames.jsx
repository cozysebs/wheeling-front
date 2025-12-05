import { Route, Routes } from "react-router-dom";
import Game2048 from "../games/Game2048";

export default function PlayingGames() {
  return(<>
    <Routes>
      <Route path="/playing/game2048" element={<Game2048/>}/>
    </Routes>
  </>)
}

