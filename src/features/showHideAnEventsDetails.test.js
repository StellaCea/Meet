import React from "react";
import { mount, shallow } from "enzyme";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
    test("An event element is collapsed by default", ({ given, when, then }) => {
        let AppWrapper;
        given("the user sees a list of events", async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
        });

        when("the user sees an event element", () => {
            expect(AppWrapper.find(".event").at(0)).toHaveLength(1);
        });

        then("the list of upcoming events is displayed without any details", () => {
            expect(AppWrapper.find(".event__Details").at(0)).toHaveLength(0);
        });
    });

    test("User can expand an event to see its details", ({ given, when, then }) => {
        let AppWrapper;
        given("the list of events in a specific city is displayed without event details", async () => {
            AppWrapper = await mount (<App />);
            AppWrapper.update();
            expect(AppWrapper.find(".event").at(0)).toHaveLength(1);
            expect(AppWrapper.find(".event__Details").at(0)).toHaveLength(0);
        });

        when("the user clicks the 'show details' button", () => {
            AppWrapper.find(".event button").at(0).simulate("click");
        });

        then("the event element should expand, displaying the event details", () => {
            expect(AppWrapper.find(".event__Details").at(0)).toHaveLength(1);
        });
    });

    test("User can collapse an event to hide its details", ({ given, when, then }) => {
        let AppWrapper;
        given("an event element is expanded", async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find(".event button").at(0).simulate("click");
            expect(AppWrapper.find(".event__Details").at(0)).toHaveLength(1);
        });

        when("the user clicks the 'hide details' button", () => {
            AppWrapper.find(".event button").at(0).simulate("click");
        });

        then("the event element collapses hiding the details", () => {
            expect(AppWrapper.find(".event__Details").at(0)).toHaveLength(0);
        });
    });

});