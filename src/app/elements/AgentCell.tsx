import React from "react";
import { State } from "../data/types";
function onCellClick(state: State, row: number, column: number) {
    return (e: React.FormEvent) => {
        e.preventDefault();
        let st = state.get();
        let cell = st.board[row][column];
        cell.revealed = true;
        st.counts[cell.color]++;
        if (cell.color != st.current.turn) {
            st.current.turnEnded = true;
            if (cell.color == "Black") {
                st.ended = true;
                st.current.turnEndedReason = `${st.current.turn} team contacted the assassin!`;
            } else if (cell.color == "Yellow")
                st.current.turnEndedReason = "You contacted a bystander!";
            else
                st.current.turnEndedReason =
                    "You contacted an agent on the other team!";
        } else if (typeof st.current.clicksLeft == "number") {
            st.current.clicksLeft--;
            if (st.current.clicksLeft <= 0) {
                st.current.turnEnded = true;
                st.current.turnEndedReason = "You're out of tries!";
            }
        }
        let win =
            st.counts[st.first] >= 9
                ? st.first
                : st.counts[st.second] >= 8
                ? st.second
                : null;
        if (win) {
            st.ended = true;
            st.current.turnEnded = true;
            st.current.turnEndedReason = `${win} team wins!`;
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
    const cell = state.get().board[row][column];
    /* faded cases:
     * state.get().current.mode == 'Spymaster' && cell.revealed
     * state.get().ended
     * previously clicked
     * */
    /* solid cases
     * JUST clicked
     * state.get().current.mode == 'Spymaster' && !cell.revealed
     */
    const visible =
        state.get().current.mode == "Spymaster" ||
        cell.revealed ||
        state.get().ended;
    const faded =
        (state.get().current.mode == "Spymaster" || state.get().ended) &&
        cell.revealed;
    return (
        <td
            key={`cell${row}${column}`}
            className={`${visible ? cell.color : ""} ${faded ? "faded" : ""}`}
        >
            <button
                onClick={onCellClick(state, row, column)}
                type="submit"
                key={`button${row}${column}`}
                className="wordButton"
                disabled={visible || state.get().current.turnEnded}
            >
                {word}
            </button>
        </td>
    );
};
