import "./commands";
import { MemoryRouter } from "react-router-dom";
import { mount } from "cypress/react";
import { Provider } from "react-redux";
import { store } from "../../src/_helpers/store";
import React from "react";

Cypress.Commands.add("mount", (component, path, options = {}) => {
  const { reduxStore = store, ...mountOptions } = options;

  const wrapped = (
    <MemoryRouter initialEntries={[{ pathname: path }]}>
      <Provider store={reduxStore}>{component}</Provider>
    </MemoryRouter>
  );

  return mount(wrapped, mountOptions);
});
