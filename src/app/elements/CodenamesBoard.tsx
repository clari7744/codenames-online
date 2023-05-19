"use client";
import React from "react";
import { Agent, Board, State, StateData } from "../data/types";
import { buildN } from "../data/utils";
import { AgentCell } from "./AgentCell";
const fetcher = (init?: RequestInit) => (url: string) =>
    fetch(url, init).then(res => res.json());
export const CodenamesBoard: React.FC<{
    first: Agent;
    board: Board;
}> = function ({ first, board }) {
    const _state = React.useState<StateData>({
        running: true,
        mode: "spymaster",
        turn: first,
        first,
        board,
    });
    const state: State = { get: () => _state[0], set: _state[1] };
    let run = state.get().running;
    React.useEffect(() => {
        if (!run) alert(`💣 Game Over 💣`);
    }, [run]);
    return (
        <div id="codenamesBoardDiv">
            <table id="codenamesBoard">
                <tbody>
                    {buildN(5, row => (
                        <tr key={`row${row}`}>
                            {buildN(5, col => (
                                <AgentCell
                                    key={`agentCell${row}${col}`}
                                    state={state}
                                    row={row}
                                    column={col}
                                    word={board[row][col].word}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
