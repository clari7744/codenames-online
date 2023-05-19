import { Agent, Board } from "@/app/types";
import { newBoard } from "@/app/utils";
import words from "@/app/wordlist";
import { NextResponse } from "next/server";
const storage: {
    id: number;
    boards: Record<number, { first: Agent; board: Board }>;
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
        console.log("mew board output", JSON.stringify(board));
        console.log("#", storage.id);
        storage.boards[storage.id++] = board;
        console.log("all boards", JSON.stringify(storage));
        return NextResponse.json(board);
    }
    console.log(
        "board being returned",
        context.params.boardId,
        JSON.stringify(storage.boards[context.params.boardId])
    );
    return NextResponse.json(storage.boards[context.params.boardId]);
}
export async function POST(
    request: Request,
    context: { params: { boardId: string } }
) {
    console.log(JSON.stringify({ data: await request.json(), context }));
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
