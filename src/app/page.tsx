import "./data/board.css";
import { Board, Team } from "./data/types";
import { WhatShow } from "./elements/WhatShow";
export default async function Home() {
    let req = await fetch("http://localhost:3000/api/boards/new", {
        cache: "no-store",
    });
    let {
        first,
        board,
        boardId,
    }: { first: Team; board: Board; boardId: number } = await req.json();
    console.log(first, "board", boardId);
    console.log("rendering");
    //console.log("postfetch/", first, board);
    return <WhatShow first={first} board={board} boardId={boardId} />; /*
        <div>
            <WhatShow first={first} board={board} boardId={boardId} />
            <div>
                <footer>
                    <button>New Game</button>
                </footer>
            </div>
        </div>
    );*/
}
