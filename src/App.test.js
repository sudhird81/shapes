import React from "react";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";

it("renders welcome message", () => {
    render(<App />);
    expect(screen.getByText("SHAPES")).toBeInTheDocument();
});
