import React from "react";
import { State, Team } from "../data/types";
import { buildN, flip } from "../data/utils";
import { AgentCell } from "./AgentCell";
import { SpymasterView } from "./SpymasterView";
import { TopInfo } from "./TopInfo";
function onPlayerNext(state: State) {
    return (e: React.FormEvent) => {
        e.preventDefault();
        state.set(s => ({
            ...s,
            current: {
                ...s.current,
                turn: flip(s.current.turn, ...Team),
                showBoard: false,
            },
        }));
    };
}
export const CodenamesBoard: React.FC<{
    state: State;
}> = function ({ state }) {
    return (
        <div>
            <TopInfo state={state} />
            <table key="codenamesBoard">
                <tbody>
                    {buildN(5, row => (
                        <tr key={`row${row}`}>
                            {buildN(5, col => (
                                <AgentCell
                                    key={`agentCell${row}${col}`}
                                    state={state}
                                    row={row}
                                    column={col}
                                    word={state.get().board[row][col].word}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {(() => {
                if (state.get().current.mode == "Spymaster")
                    return <SpymasterView state={state} />;
                else
                    return (
                        <div className="center">
                            <button
                                className="nextButton"
                                onClick={onPlayerNext(state)}
                                disabled={state.get().ended}
                            >
                                Next
                            </button>{" "}
                        </div>
                    );
            })()}
        </div>
    );
};
