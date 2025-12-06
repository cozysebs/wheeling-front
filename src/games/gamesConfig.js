import Coil from "./Coil";
import Game2048 from "./Game2048";
import Parity from "./Parity";
import Snake from "./Snake";
import Tetris from "./Tetris";

export const games = [
  {
    id: "2048",
    title: "2048",
    component: Game2048,
  },
  {
    id: "coil",
    title: "coil",
    component: Coil,
  },
  {
    id: "parity",
    title: "parity",
    component: Parity,
  },
  {
    id: "snake",
    title: "snake",
    component: Snake,
  },
  {
    id: "tetris",
    title: "tetris",
    component: Tetris,
  },
]