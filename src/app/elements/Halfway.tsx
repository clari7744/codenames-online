"use client";

import { Mode, State } from "../data/types";
import { PassDevice } from "./PassDevice";

export const Halfway: React.FC<{ state: State; next: Mode }> =
    function Halfway({ state, next }) {
        function goNext(e: React.FormEvent) {
            state.set(s => ({
                ...s,
                current: {
                    ...s.current,
                    showBoard: true,
                    mode: next,
                    turnEnded: false,
                },
            }));
        }
        return (
            <div className="center">
                <PassDevice team={state.get().current.turn} mode={next} />
                <button className="nextButton" onClick={goNext}>
                    Next
                </button>
            </div>
        );
    };
