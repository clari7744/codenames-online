import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { randChoice, words } from "./functions";
function onClick(row: number, column: number) {
    function inner(e: React.FormEvent) {
        console.log(`Clicked ${row}${column}`);
    }
    return inner;
}
export const AgentCell: React.FC<{
    row: number;
    column: number;
}> = function ({ row, column }) {
    return (
        <td key={`cell${row}${column}`}>
            <Form onSubmit={onClick(row, column)}>
                <InputGroup>
                    <Button
                        type="submit"
                        key={`button${row}${column}`}
                        className="wordButton"
                        /*onClick={`clicked('button${r}${c}', '${word}'})`*/
                    >
                        {randChoice(words())}
                    </Button>
                </InputGroup>
            </Form>
        </td>
    );
};
