import { Board, Team } from "@/app/data/types";
import { newBoard } from "@/app/data/utils";
import words from "@/app/data/wordlist";
import { NextResponse } from "next/server";
const storage: {
    id: number;
    boards: Record<number, { first: Team; board: Board }>;
} = {
    id: 0,
    boards: { 0: newBoard(words) },
};
export async function GET(
    request: Request,
    context: { params: { boardId: number | "new" } }
) {
    let url = new URL(request.url);
    if (context.params.boardId == "new") {
        let board = newBoard(words);
        console.log("new board output", JSON.stringify(board));
        console.log("#", storage.id);
        storage.boards[storage.id++] = board;
        console.log("all boards", JSON.stringify(storage));
        return NextResponse.json({ ...board, boardId: storage.id - 1 });
    }
    console.log(
        "board being returned",
        context.params.boardId,
        JSON.stringify({
            ...storage.boards[context.params.boardId],
        })
    );
    return NextResponse.json({
        ...storage.boards[context.params.boardId],
        boardId: context.params.boardId,
    });
}
export async function POST(
    request: Request,
    context: { params: { boardId: number } }
) {
    let j: Board = await request.json();
    if (!context.params.boardId) {
        return NextResponse.json({}, { status: 400 });
    }
    console.log(
        `received req at ${context.params.boardId}`,
        JSON.stringify(j, null, 4)
    );
    storage.boards[context.params.boardId].board = j;
    import("fs").then(fs => {
        fs.writeFileSync("storage.json", JSON.stringify(storage, null, 4));
    });
    return NextResponse.json({});
    /*let { board } = await request.json();
    try {
        if (!board) {
            return NextResponse.json({ status: 400 });
        }
        console.log(await request.json());
        return NextResponse.json({ status: 200 });
    } catch (e) {
        console.log("post errored", e);
    }*/
}
