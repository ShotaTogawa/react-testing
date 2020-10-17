import React from "react";
import {screen, render, cleanup} from "@testing-library/react";
import FrameworkList from "./FrameworkList";


afterEach(() => cleanup());

describe("Rendering the list with props", () => {
    it("should render no data! when no data propped", () => {
        render(<FrameworkList />);
        expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("should render list item correctly", () => {
        const dummyData = [
          {
            id: 1,
            item: "React"
          },
          {
            id: 2,
            item: "Angular"
          },
          {
            id: 3,
            item: "vue"
          }
        ]

        render(<FrameworkList frameworks={dummyData} />);
        const frameworkItems = screen.getAllByRole("listitem").map(ele => ele.textContent);
        const dummyItems = dummyData.map(data => data.item);
        expect(frameworkItems).toEqual(dummyItems)
        expect(screen.queryByText("No Data")).toBeNull();
    })
})