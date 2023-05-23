import { Board, Color, Team, Tile } from "./types";

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
export function flip<T>(thevar: T, val1: T, val2: T) {
    return thevar == val1 ? val2 : val1;
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
    let first = randChoice<Team>(["Red", "Blue"]);
    let toUse: Array<Tile> = [];
    toUse.push(...buildN(9, n => newTile(first, randWord())));
    toUse.push(
        ...buildN(8, n => newTile(flip(first, "Red", "Blue"), randWord()))
    );
    toUse.push(...buildN(7, n => newTile("Yellow", randWord())));
    toUse.push(newTile("Black", randWord()));
    const board = buildN(5, row => {
        return buildN(5, col => {
            return randChoice(toUse.splice(randInt(toUse.length), 1));
        });
    }) as Board;

    return { first, board };
}
export function s(cond: boolean | number | any[]) {
    if (
        (typeof cond == "boolean" && cond) ||
        (typeof cond == "number" && cond != 1) ||
        (typeof cond == "object" && cond.length != 1)
    )
        return "s";
    return "";
}
