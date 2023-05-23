import React from "react";
import { State } from "../data/types";
import { PassDevice } from "./PassDevice";
export const StartGame: React.FC<{ state: State }> = function ({ state }) {
    return (
        <div className="center">
            <h2>Welcome to Codenames!</h2>
            <PassDevice
                team={state.get().first}
                mode={state.get().current.mode}
            />
            <p>Then click the start button to begin</p>
            <div>
                <button
                    onClick={() => {
                        state.set(s => ({ ...s, started: true }));
                    }}
                    className="nextButton"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};
