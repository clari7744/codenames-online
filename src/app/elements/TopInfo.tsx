import React from "react";
import { State } from "../data/types";
import { s } from "../data/utils";

export const TopInfo: React.FC<{ state: State }> = function ({ state }) {
    function is(cond: boolean, content: string, _default?: string) {
        if (cond) return <p style={{ whiteSpace: "pre-line" }}>{content}</p>;
        if (_default) return <p>{_default}</p>;
    }
    const data = state.get().current;
    return (
        <div className="center">
            <h2 className={data.turn + "Text"}>
                {data.turn} {data.mode}
            </h2>
            {is(
                data.mode == "Player" && !state.get().ended,
                `Clue: "${data.clue}"
                # Matching: ${data.count}
                Clicks Left: ${data.clicksLeft} click${s(data.clicksLeft)}`
            )}
            {is(state.get().ended, "Game over!")}
            {is(
                data.turnEnded,
                `Your turn is over! Reason: ${data.turnEndedReason}`
            )}
        </div>
    );
};
