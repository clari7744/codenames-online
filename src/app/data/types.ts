import React from "react";
export type Mode = "Spymaster" | "Player";
export type Team = "Red" | "Blue";
export const Team = ["Red", "Blue"] as const;
export type Color = Team | "Black" | "Yellow";
export interface Tile {
    color: Color;
    word: string;
    revealed: boolean;
}
export type Row = [Tile, Tile, Tile, Tile, Tile];
export type Board = [Row, Row, Row, Row, Row];
export interface Current {
    turn: Team;
    mode: Mode;
    clue: string;
    count: number;
    clicksLeft: number;
    showBoard: boolean;
    turnEnded: boolean;
    turnEndedReason: string;
}
export interface StateData {
    started: boolean;
    ended: boolean;
    first: Team;
    second: Team;
    board: Board;
    boardId: number;
    counts: {
        Red: number;
        Blue: number;
        Yellow: number;
        Black: number;
    };
    current: Current;
}
export interface State {
    get: () => StateData;
    set: React.Dispatch<React.SetStateAction<StateData>>;
}
export interface ClueForm extends HTMLFormElement {
    clue: HTMLInputElement;
    count: HTMLInputElement;
}
