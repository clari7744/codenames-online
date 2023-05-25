import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ClueForm, State } from "../data/types";
function sendClue(state: State) {
    return (e: React.FormEvent) => {
        e.preventDefault();
        let form = e.target as ClueForm;
        let clue = form.clue.value;
        let count = parseInt(form.count.value);
        if (!clue) return alert("Please enter a clue");
        else if (count < 0 || isNaN(count))
            return alert(
                "Please enter the number of words that this clue matches"
            );
        state.set(s => ({
            ...s,
            current: {
                ...s.current,
                clue,
                count,
                clicksLeft: count > 0 ? count + 1 : "∞",
                showBoard: false,
            },
        }));
    };
}
export const SpymasterView: React.FC<{ state: State }> = function ({ state }) {
    return (
        <div className="center">
            <Form onSubmit={sendClue(state)}>
                <InputGroup>
                    <Form.Control
                        style={{ margin: 15 }}
                        type="text"
                        name="clue"
                        placeholder="What's your clue?"
                    />
                    <Form.Control
                        style={{ margin: 15 }}
                        type="number"
                        min="0"
                        max="9"
                        name="count"
                        placeholder="#"
                    />
                    <br />
                    <Button type="submit">Next</Button>
                </InputGroup>
            </Form>
        </div>
    );
};
