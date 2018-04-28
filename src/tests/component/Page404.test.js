import React from "react";
import { shallow } from "enzyme";
import Page404 from "../../components/Page404";

test("should render Page404 correctly", () => {
  const wrapper = shallow(<Page404 />);
  expect(wrapper).toMatchSnapshot();
});
