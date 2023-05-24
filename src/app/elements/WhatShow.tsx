"use client";
import React from "react";
import { Board, State, StateData, Team } from "../data/types";
import { CodenamesBoard } from "./CodenamesBoard";
import { Halfway } from "./Halfway";
import { StartGame } from "./StartGame";
import { flip } from "../data/utils";

export const WhatShow: React.FC<{
    first: Team;
    board: Board;
    boardId: number;
}> = function ({ first, board, boardId }) {
    const _state = React.useState<StateData>({
        started: false,
        ended: false,
        first,
        second: flip(first, "Red", "Blue"),
        board,
        boardId: boardId,
        counts: {
            Red: 0,
            Blue: 0,
            Yellow: 0,
            Black: 0,
        },
        current: {
            mode: "Spymaster",
            turn: first,
            clue: "",
            count: 0,
            clicksLeft: 0,
            showBoard: true,
            turnEnded: false,
            turnEndedReason: "",
        },
    });
    const state: State = { get: () => _state[0], set: _state[1] };
    if (!state.get().started) {
        return <StartGame state={state} />;
    } else {
        if (state.get().current.showBoard)
            return <CodenamesBoard state={state} />;
        else
            return (
                <Halfway
                    state={state}
                    next={
                        state.get().current.mode == "Player"
                            ? "Spymaster"
                            : "Player"
                    }
                />
            );
    }
};
