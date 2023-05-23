import React from "react";
import { Mode, Team } from "../data/types";

export const PassDevice: React.FC<{ team: Team; mode: Mode }> = function ({
    team,
    mode,
}) {
    return (
        <p>
            Pass the device to the{" "}
            <span className={team + "Text"}>
                {team} Team&apos;s {mode}
            </span>
            <br />
        </p>
    );
};
