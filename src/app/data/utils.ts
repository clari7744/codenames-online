import { Agent, Board, Color, Tile } from "./types";

export function randInt(min: number, max?: number) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min) + min);
}
export function randChoice<T>(array: Array<T>) {
    return array[randInt(0, array.length)];
}
export function create(name: string, attributes: Record<string, string>) {
    const ret = document.createElement(name);
    for (let [k, v] of Object.entries(attributes)) ret.setAttribute(k, v);
    return ret;
}
export function buildN<T>(n: number, pred: (n: number) => T) {
    let ret: Array<T> = [];
    for (let i = 0; i < n; i++) {
        ret.push(pred(i));
    }
    return ret;
}
function newTile(color: Color, word: string): Tile {
    return {
        color,
        word,
        revealed: false,
    };
}
export function newBoard(words: string[]) {
    let randWord = () => words.splice(randInt(words.length), 1)[0];
    let first = randChoice<Agent>(["red", "blue"]);
    let toUse: Array<Tile> = [];
    toUse.push(...buildN(9, n => newTile(first, randWord())));
    toUse.push(
        ...buildN(8, n => newTile(first == "red" ? "blue" : "red", randWord()))
    );
    toUse.push(...buildN(7, n => newTile("yellow", randWord())));
    toUse.push(newTile("black", randWord()));
    const board = buildN(5, row => {
        return buildN(5, col => {
            return randChoice(toUse.splice(randInt(toUse.length), 1));
        });
    }) as Board;

    return { first, board };
}

export class Colors {
    static red = "rgba(245, 0, 0, 0.9)";
    static blue = "rgba(20, 110, 245, 0.9)";
    static yellow = "rgba(245, 200, 0, 0.9)";
    static black = "rgba(0, 0, 0, 0.9)";
}
/*export function endGame() {
    alert("Game over!");
    for (const b of Array.from(document.getElementsByClassName("wordButton")))
        b.setAttribute("disabled", "");
}
export function clicked(id: string, word: string) {
    console.log(`clicked ${id} (${word})`);
    const btn = document.getElementById(id);
    if (!btn) return;
    if (btn.style.backgroundColor)
        return alert("This word is already revealed!");
    const c = randChoice(availableColors);
    const n = ++colorsUsed[c];
    btn.style.backgroundColor = c;
    if (c == "black" || (c == first && n == 9) || (c == other && n == 8))
        return endGame();
}*/
