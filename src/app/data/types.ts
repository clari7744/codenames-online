import React from "react";
export type Mode = "spymaster" | "player";
export type Agent = "red" | "blue";
export type Color = Agent | "black" | "yellow";
export interface Tile {
    color: Color;
    word: string;
    revealed: boolean;
}
export type Row = [Tile, Tile, Tile, Tile, Tile];
export type Board = [Row, Row, Row, Row, Row];
export interface StateData {
    running: boolean;
    mode: Mode;
    first: Agent;
    turn: Agent;
    board: Board;
}
export interface State {
    get: () => StateData;
    set: React.Dispatch<React.SetStateAction<StateData>>;
}
