import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
    test("When the user has not specified the number of events, 32 is the default number", ({ given, when, then }) => {
        given ("the user has not specified the number of events they want to see", () => {
        });

        let AppWrapper;

        when("the user opens the app", () => {
            AppWrapper = mount (<App />);
        });

        then("the app displays a list of 32 upcoming events by default", () => {
            AppWrapper.update();
            expect(AppWrapper.find(".event")).toHaveLength(mockData.slice(0, 32).length);
        });
    });

    test("User can change the number of events they want to see", ({ given, when, then }) => {

        let AppWrapper;

        given("the user sees a list of events", async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
        });

        when("the user specifies the number of events they want to see", () => {
            AppWrapper.find(".numbOfEvents").simulate("change", { target: { value: 1 } });
        });

        then("the app should display that number of upcoming events", () => {
            AppWrapper.update();
            expect(AppWrapper.find(".event")).toHaveLength(1);
        });
    });
    
});