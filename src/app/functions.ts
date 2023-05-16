import fs from "fs";
export const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);
export const randChoice = <T>(array: Array<T>) =>
    array[randInt(0, array.length)];
type Agent = "red" | "blue";
const opts: Array<Agent> = ["red", "blue"];
const first = randChoice(opts);
const other: Agent = first == "red" ? "blue" : "red";
let availableColors = ["red", "blue", "yellow", "black"];
const colorsUsed = Object.fromEntries(availableColors.map(c => [c, 0]));
const ended = false;
export function build<T>(n: number, pred: (n: number) => T) {
    let ret: Array<T> = [];
    for (let i = 0; i < n; i++) {
        ret.push(pred(i));
    }
    return ret;
}
export const create = (name: string, attributes: Record<string, string>) => {
    const ret = document.createElement(name);
    for (let [k, v] of Object.entries(attributes)) ret.setAttribute(k, v);
    return ret;
};
export function endGame() {
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
}
const _words: string[] = [];
export function words() {
    if (_words.some(k => k)) return _words;
    _words.push(
        ...fs.readFileSync("src/data/wordlist.txt", "utf8").split("\n")
    );
    return _words;
}
/*export async function loadTable() {
    const tbl: HTMLTableElement = document.getElementById(
        "codenamesBoard"
    ) as HTMLTableElement;
    for (let r = 0; r < 5; r++) {
        let row = create("tr", { id: `row${r}` });
        for (let c = 0; c < 5; c++) {
            let word = randChoice(words());
            let cell = create("td", { id: `cell${r}${c}` });
            let btn = create("input", {
                type: "button",
                value: word,
                id: `button${r}${c}`,
                class: "wordButton",
                onclick: `clicked('button${r}${c}', '${word}')`,
            });
            cell.appendChild(btn);
            row.appendChild(cell);
        }
        tbl.appendChild(row);
    }
}*/
