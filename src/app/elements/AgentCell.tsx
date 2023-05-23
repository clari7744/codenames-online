import React from "react";
import { State } from "../data/types";
function onCellClick(state: State, row: number, column: number) {
    return (e: React.FormEvent) => {
        e.preventDefault();
        let st = state.get();
        st.board[row][column].revealed = true;
        if (st.board[row][column].color == st.current.turn) {
            st.current.clicksLeft--;
            if (st.current.clicksLeft <= 0) {
                st.current.turnEnded = true;
                st.current.turnEndedReason = "Out of clicks";
            }
        } else if (st.board[row][column].color == "Black") {
            st.ended = true;
            st.current.turnEnded = true;
            st.current.turnEndedReason = "boom";
        } else {
            // other team or yellow
            st.current.turnEnded = true;
            st.current.turnEndedReason = "Not your team";
        }
        state.set(s => ({ ...st }));

        fetch(`/api/boards/${st.boardId}`, {
            method: "POST",
            body: JSON.stringify(st.board),
        }).then(r => console.log(r));
        console.log(`Clicked ${row}${column}`);
    };
}
export const AgentCell: React.FC<{
    state: State;
    row: number;
    column: number;
    word: string;
}> = function ({ state, row, column, word }) {
    let cell = state.get().board![row][column];
    const show = () =>
        cell.revealed ||
        state.get().current.mode == "Spymaster" ||
        state.get().ended;
    return (
        <td
            key={`cell${row}${column}`}
            className={show() ? cell.color : ""}
            /*style={{
                backgroundColor: show() ? Colors[cell.color] : "",
                color: show() && cell.color == "Black" ? "white" : "black",
            }}*/
        >
            <button
                onClick={onCellClick(state, row, column)}
                type="submit"
                key={`button${row}${column}`}
                className="wordButton"
                disabled={
                    !state.get().started ||
                    state.get().current.turnEnded ||
                    show()
                }
            >
                {word}
            </button>
        </td>
    );
};
