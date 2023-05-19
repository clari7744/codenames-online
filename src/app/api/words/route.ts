import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    let data = {
        status: 200,
        words: (await fs.readFile("src/data/wordlist.txt", "utf8")).split("\n"),
        headers: {
            "Content-Type": "application/json",
        },
    };
    return NextResponse.json({ ...data });
}
/*export default async function handler(req: Request, res: any) {
    const fileContents = await fs.readFile("src/data/wordlist.txt", "utf8");
    res.status(200).json({ words: fileContents.split("\n") });
}*/
