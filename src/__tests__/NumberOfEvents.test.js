import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
    });

    test ("renders text input", () => {
        expect (NumberOfEventsWrapper.find(".numbOfEvents")).toHaveLength(1);
    });

    test ("the number is set to 32 by default", () => {
        expect (NumberOfEventsWrapper.state("query")).toBe(32);
    });

    test ("input function is rendered correctly", () => {
        NumberOfEventsWrapper.setState({ query:10 });
        NumberOfEventsWrapper.find(".numbOfEvents").simulate("change", {target: { value: 5 } });
        expect (NumberOfEventsWrapper.state("query")).toBe(5);
    });
});

