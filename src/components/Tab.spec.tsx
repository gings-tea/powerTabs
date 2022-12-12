import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tab from "./Tab";

describe("Tab.Pane", () => {
  it("renders the children as pane content", () => {
    const childrenText = "children";
    const component = <Tab.Pane title="">{childrenText}</Tab.Pane>;

    render(component);

    expect(screen.getByText(childrenText)).toBeInTheDocument();
  });

  it("renders the title as a header when given", () => {
    const title = "some title";
    const childrenText = "children";
    const component = <Tab.Pane title={title}>{childrenText}</Tab.Pane>;

    render(component);

    expect(screen.getByRole("tab", { name: title })).toBeInTheDocument();
  });

  it("does not render content when show content is false", () => {
    const childrenText = "children";
    const component = (
      <Tab.Pane title="" showContent={false}>
        {childrenText}
      </Tab.Pane>
    );

    render(component);

    expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
  });

  it("calls onTitleClick callback when title is clicked", () => {
    const title = "some title";
    const childrenText = "children";
    const mockCallback = jest.fn();
    const component = (
      <Tab.Pane title={title} showContent={false} onTitleClick={mockCallback}>
        {childrenText}
      </Tab.Pane>
    );

    render(component);

    const titleButton = screen.getByRole("tab", { name: title });

    userEvent.click(titleButton);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});

describe("Tab", () => {
  describe("uncontrolled", () => {
    it("renders initial pane 0 as active", () => {
      const component = (
        <Tab initialActive={0}>
          <Tab.Pane title="1">first child</Tab.Pane>
          <Tab.Pane title="2">second child</Tab.Pane>
        </Tab>
      );

      render(component);

      expect(screen.getByText("first child")).toBeInTheDocument();
      expect(screen.queryByText("second child")).not.toBeInTheDocument();
    });

    it("renders initial pane 1 as active", () => {
      const component = (
        <Tab initialActive={1}>
          <Tab.Pane title="1">first child</Tab.Pane>
          <Tab.Pane title="2">second child</Tab.Pane>
        </Tab>
      );

      render(component);

      expect(screen.queryByText("first child")).not.toBeInTheDocument();
      expect(screen.getByText("second child")).toBeInTheDocument();
    });

    it("shows second pane when title 2 clicked", () => {
      const component = (
        <Tab initialActive={0}>
          <Tab.Pane title="1">first child</Tab.Pane>
          <Tab.Pane title="2">second child</Tab.Pane>
        </Tab>
      );

      render(component);

      const title2 = screen.getByRole("tab", { name: "2" });
      userEvent.click(title2);

      expect(screen.getByText("second child")).toBeInTheDocument();
    });
  });

  describe("controlled", () => {
    const mockOnActiveChange = jest.fn();
    it("renders active 0 pane", () => {
      const component = (
        <Tab active={0} onActiveChange={mockOnActiveChange}>
          <Tab.Pane title="1">first child</Tab.Pane>
          <Tab.Pane title="2">second child</Tab.Pane>
        </Tab>
      );

      render(component);

      expect(screen.getByText("first child")).toBeInTheDocument();
      expect(screen.queryByText("second child")).not.toBeInTheDocument();
    });

    it("renders active 1 pane", () => {
      const component = (
        <Tab active={1} onActiveChange={mockOnActiveChange}>
          <Tab.Pane title="1">first child</Tab.Pane>
          <Tab.Pane title="2">second child</Tab.Pane>
        </Tab>
      );

      render(component);

      expect(screen.queryByText("first child")).not.toBeInTheDocument();
      expect(screen.getByText("second child")).toBeInTheDocument();
    });

    it("calls onActiveChange callback with tab index", () => {
      const component = (
        <Tab active={0} onActiveChange={mockOnActiveChange}>
          <Tab.Pane title="1">first child</Tab.Pane>
          <Tab.Pane title="2">second child</Tab.Pane>
        </Tab>
      );

      render(component);

      const title2 = screen.getByRole("tab", { name: "2" });
      userEvent.click(title2);

      expect(mockOnActiveChange).toHaveBeenCalledTimes(1);
      expect(mockOnActiveChange).toHaveBeenCalledWith(1);
    });
  });
});
