import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { Countrycodeadmin, modalStyle } from "../../src/Countrycodeadmin.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "Countrycodeadmin",
  includes: jest.fn()
};

const classesN = {
  MainWrap: "",
  SearchCounry: "",
  WrapperGrid: "",
  CountryBlock: ""
};

const resp = {
  blocked_countries: [
    {
      id: 381,
      country_code: "+1",
      country_name: "Montserrat",
      allow: false,
      created_at: "2023-04-18T15:33:51.479Z",
      updated_at: "2023-04-21T05:28:31.731Z"
    },
    {
      id: 335,
      country_code: "+91",
      country_name: "India",
      allow: true,
      created_at: "2023-04-18T15:33:51.396Z",
      updated_at: "2023-04-22T04:20:31.969Z"
    }
  ]
};

const feature = loadFeature(
  "./__tests__/features/CountryCodeAdmin-scenario.web.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CountryCodeAdmin", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Countrycodeadmin;

    given("I am a User loading CountryCodeAdmin", () => {
      exampleBlockA = shallow(
        <Countrycodeadmin classes={classesN} {...screenProps} />
      );
    });

    when("I navigate to the CountryCodeAdmin", () => {
      instance = exampleBlockA.instance() as Countrycodeadmin;
    });

    then("CountryCodeAdmin will load with out errors", () => {
      expect(exampleBlockA).toBeDefined();
    });

    then("styles load", () => {
      const theme = createTheme();
      expect(modalStyle(theme).WrapperGrid).toMatchObject({
        display: "flex",
        alignItems: "stretch",
        width: "100%"
      });
    });

    when("Fetch country list from api", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        resp
      );
      instance.countryCodeListApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("We get all list of country", () => {
      expect(instance.state.dataSource).toEqual(resp);
    });

    when("I am clicked on toggle button to block country", () => {
      const toggleInput = exampleBlockA.findWhere(
        node => node.prop("data-test-id") === "countryCodeToggle"
      );
      const event = {
        target: {
          value: "Montserrat"
        }
      };
      toggleInput.at(0).simulate("change", event);
    });

    then("Blocked country api call", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Updated Succesfully"
        }
      );
      instance.countryBlockedApi = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("Country toggle button checked", () => {
      const toggleInput = exampleBlockA.findWhere(
        node => node.prop("data-test-id") === "countryCodeToggle"
      );
      expect(toggleInput.at(0).props().checked).toBe(true);
    });

    when("Search country name", () => {
      const countryInput = exampleBlockA.findWhere(
        node => node.prop("data-test-id") === "searchCountryInput"
      );
      const event = {
        target: {
          value: "India"
        }
      };
      countryInput.simulate("change", event);
    });

    then("Searchterm state change", () => {
      expect(instance.state.searchTerm).toEqual("India");
    });
  });
});
