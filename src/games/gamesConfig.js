import Coil from "./Coil";
import Game2048 from "./Game2048";
import Parity from "./Parity";
import Snake from "./Snake";
import Tetris from "./Tetris";

export const games = [
  {
    slug: "2048",
    title: "2048",
    description: "Slide numbered tiles to merge them and reach the 2048 tile.",
    component: Game2048,
    thumbnailUrl: "",
    category: "PUZZLE",
    difficulty: "EASY",
  },
  {
    slug: "coil",
    title: "coil",
    description: "Defeat enemies by enclosing them in your glowing trail on the arena.",
    component: Coil,
    thumbnailUrl: "",
    category: "CASUAL",
    difficulty: "EASY",
  },
  {
    slug: "parity",
    title: "parity",
    description: "Move around the grid and increment cells until every number on the board is the same.",
    component: Parity,
    thumbnailUrl: "",
    category: "PUZZLE",
    difficulty: "EASY",
  },
  {
    slug: "snake",
    title: "snake",
    description: "Guide the snake, eat food to grow, and avoid colliding with walls or your own tail.",
    component: Snake,
    thumbnailUrl: "",
    category: "CASUAL",
    difficulty: "EASY",
  },
  {
    slug: "tetris",
    title: "tetris",
    description: "Rotate and stack falling tetrominoes to complete and clear horizontal lines.",
    component: Tetris,
    thumbnailUrl: "",
    category: "CASUAL",
    difficulty: "EASY",
  },
]