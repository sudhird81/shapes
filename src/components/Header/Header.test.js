/****************************/
//Author - Sudhir Dadwal
/****************************/
import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";

describe("shape component", () => {
    let Wrapper = "";

    beforeEach(() => {
        Wrapper = shallow(<Header />);
    });

    it("should header render", () => {
        const result = Wrapper.find(".header");
        expect(result).toHaveLength(1);
    });
});
