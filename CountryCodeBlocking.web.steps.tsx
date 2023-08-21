import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { Countrycodeblocking } from "../../src/Countrycodeblocking.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "CountryCodeBlocking",
};

const classesN = {
  DialWrap: "",
  DialInner: "",
  DialPad: "",
  DialInput: "",
  error: "",
  DialGrid: "",
  DialNum: "",
  CheckButton: "",
  color: "",
  cloaseBtn: "",
};

const feature = loadFeature(
  "./__tests__/features/CountryCodeBlocking-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CountryCodeBlocking", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Countrycodeblocking;

    given("I am a User loading CountryCodeBlocking", () => {
      exampleBlockA = shallow(
        <Countrycodeblocking classes={classesN} {...screenProps} />
      );
    });

    when("I navigate to the CountryCodeBlocking", () => {
      instance = exampleBlockA.instance() as Countrycodeblocking;
    });

    then("CountryCodeBlocking will load with out errors", () => {
      expect(exampleBlockA).toBeDefined();
    });

    when("Clicked on checkcountry code button", () => {
      const digit = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "digitNum"
      );
      digit.at(0).simulate("click");
      digit.at(2).simulate("click");
      const checkCountryCodeBtn = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "checkCountry"
      );
      checkCountryCodeBtn.simulate("click");
    });

    then("CountryCodeBlocking is blocked or not", () => {
      expect(instance.state.phoneNumber).toEqual("+1");
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
          message: "Country code blocked",
        }
      );
      instance.countryCodeApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("Modal message show", () => {
      expect(instance.state.modalShowMsg).toEqual("Country code blocked");
    });

    when("ClearDigit on press button", () => {
      const clearDigitBtn = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "clearDigit"
      );
      clearDigitBtn.simulate("click");
    });

    then("PhoneNumber state became empty", () => {
      expect(instance.state.phoneNumber).toEqual("");
    });

    when("Onpress modal close button", () => {
      const closeModalBtn = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "closeBtn"
      );
      closeModalBtn.simulate("click");
    });

    then("Modal has been closed", () => {
      expect(instance.state.openModal).toBe(false);
    });
  });
});
