import "./data/board.css";
import { Agent, Board } from "./data/types";
import { CodenamesBoard } from "./elements/CodenamesBoard";
let { first, board }: { first?: Agent; board?: Board } = {};
console.log("init", first, board);
export default async function Home() {
    if (first == undefined) {
        let req = await fetch("http://localhost:3000/api/boards/0");
        let json = await req.json();
        console.log("beep", req.status, JSON.stringify(json));
        first = json.first;
        board = json.board;
    }
    console.log("rendering");
    console.log("postfetch/", first, board);
    return <CodenamesBoard first={first!} board={board!} />;
}
