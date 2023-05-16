import React from "react";
import { AgentCell } from "./AgentCell";
import { build as buildN } from "./functions";
export const CodenamesBoard: React.FC = function () {
    return (
        <div id="codenamesBoardDiv">
            <table id="codenamesBoard">
                {buildN(5, row => (
                    <tr key={`row${row}`}>
                        {buildN(5, col => (
                            <AgentCell
                                key={`agentCell${row}${col}`}
                                row={row}
                                column={col}
                            />
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
};
