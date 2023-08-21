import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { CountryCodeLogin, webStyle } from "../../src/CountryCodeLogin.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CountryCodeLogin",
};

const classesN = {
  buttonStyle: "",
  TextInputStyle: "",
};

const feature = loadFeature(
  "./__tests__/features/CountryCodeLogin-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CountryCodeLogin", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CountryCodeLogin;

    given("I am a User loading CountryCodeLogin", () => {
      exampleBlockA = shallow(
        <CountryCodeLogin classes={classesN} {...screenProps} />
      );
    });

    when("I navigate to the CountryCodeLogin", () => {
      instance = exampleBlockA.instance() as CountryCodeLogin;
    });

    then("CountryCodeLogin will load with out errors", () => {
      expect(exampleBlockA).toBeDefined();
    });

    then("styles load", () => {
      expect(webStyle().TextInputStyle).toMatchObject({
        border: "1px solid black",
        borderRadius: "5px",
        marginTop: "40px",
      });
    });

    when("Enter email in input", () => {
      const email_field = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "emailField"
      );
      const event = {
        target: {
          value: "admin@gmail.com",
        },
      };
      email_field.simulate("change", event);
    });

    then("Input email set at state", () => {
      expect(instance.state.email).toEqual("admin@gmail.com");
    });

    when("Enter password in input", () => {
      const pass_field = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "passField"
      );
      const event = {
        target: {
          value: "123456",
        },
      };
      pass_field.simulate("change", event);
    });

    then("Input password set at state", () => {
      expect(instance.state.password).toEqual("123456");
    });

    when(
      "After enter admin email and password and click on login button",
      () => {
        const email_field = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "emailField"
        );
        const emailEvent = {
          target: {
            value: "admin@gmail.com",
          },
        };
        email_field.simulate("change", emailEvent);
        const pass_field = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "passField"
        );
        const passEvent = {
          target: {
            value: "123456",
          },
        };
        pass_field.simulate("change", passEvent);
        const digit2 = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "userLogin"
        );
        digit2.simulate("click");
      }
    );

    then("User login api call with admin role", () => {
      expect(instance.state.email).toEqual("admin@gmail.com");
      expect(instance.state.password).toEqual("123456");
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
          message: "Signed in successfully!",
          account: {
            data: {
              id: "1088",
              type: "account",
              attributes: {
                role: "Admin",
              },
            },
          },
        }
      );
      instance.UserLoginAPICallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    when(
      "After enter user email and password and click on login button",
      () => {
        const email_field = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "emailField"
        );
        const emailEvent = {
          target: {
            value: "user_content@gmail.com",
          },
        };
        email_field.simulate("change", emailEvent);
        const pass_field = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "passField"
        );
        const passEvent = {
          target: {
            value: "123456",
          },
        };
        pass_field.simulate("change", passEvent);
        const digit2 = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "userLogin"
        );
        digit2.simulate("click");
      }
    );

    then("User login api call with user role", () => {
      expect(instance.state.email).toEqual("user_content@gmail.com");
      expect(instance.state.password).toEqual("123456");
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
          message: "Signed in successfully!",
          account: {
            data: {
              id: "1088",
              type: "account",
              attributes: {
                role: "User",
              },
            },
          },
        }
      );
      instance.UserLoginAPICallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    when(
      "Enter wrong user email and password then click on login button",
      () => {
        const emailfield = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "emailField"
        );
        const emailEvent = {
          target: {
            value: "admin123@gmail.com",
          },
        };
        emailfield.simulate("change", emailEvent);
        const passfield = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "passField"
        );
        const passEvent = {
          target: {
            value: "123",
          },
        };
        passfield.simulate("change", passEvent);
        const digit2 = exampleBlockA.findWhere(
          (node) => node.prop("data-test-id") === "userLogin"
        );
        digit2.simulate("click");
      }
    );

    then("User login api check for error", () => {
      expect(instance.state.email).toEqual("admin123@gmail.com");
      expect(instance.state.password).toEqual("123");
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { message: "User not found !" }
      );
      instance.UserLoginAPICallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });
  });
});
