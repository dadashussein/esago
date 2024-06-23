import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Skill from "./Skill";

const mockStore = configureStore([]);
const store = mockStore({
  skills: {
    skills: [],
  },
});

describe("Skill Component", () => {
  test("renders Skill component with input and add button", () => {
    render(
      <Provider store={store}>
        <Skill cvId="123" />
      </Provider>,
    );

    const inputElement = screen.getByPlaceholderText(/type skill/i);
    const addButton = screen.getByRole("button", { name: /add skill/i });

    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
});
