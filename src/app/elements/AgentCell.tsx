"use client";
import React from "react";
import { State } from "../data/types";
import { Colors } from "../data/utils";
function onClick(state: State, row: number, column: number) {
    function inner(e: React.FormEvent) {
        e.preventDefault();
        let st = state.get();
        st.board[row][column].revealed = true;
        if (st.board[row][column].color == "black") {
            st.running = false;
        }
        state.set(s => ({ ...st }));
        console.log(`Clicked ${row}${column}`);
    }
    return inner;
}

export const AgentCell: React.FC<{
    state: State;
    row: number;
    column: number;
    word: string;
}> = function ({ state, row, column, word }) {
    let cell = state.get().board![row][column];
    console.log(row, column, JSON.stringify(cell));
    return (
        <td
            key={`cell${row}${column}`}
            style={{
                backgroundColor: cell.revealed ? Colors[cell.color] : "",
                color:
                    cell.revealed && cell.color == "black" ? "white" : "black",
            }}
        >
            <button
                onClick={onClick(state, row, column)}
                type="submit"
                key={`button${row}${column}`}
                className="wordButton"
                disabled={cell.revealed || !state.get().running}
            >
                {word}
            </button>
        </td>
    );
};
