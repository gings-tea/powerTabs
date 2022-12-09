import React from "react";
import { MouseEventHandler } from "react";
import { useState } from "react";
import "./Tab.scss";

interface TabCommonProps {
  children: React.ReactElement<TabPaneProps>[];
}

interface TabUncotrolledProps extends TabCommonProps {
  initialActive: number;
  active?: never;
  onActiveChange?: never;
}

interface TabControlledProps extends TabCommonProps {
  active: number;
  onActiveChange: (index: number) => void;
  initialActive?: never;
}

export type TabProps = TabUncotrolledProps | TabControlledProps;

export type TabPaneProps = {
  children: string;
  title: string;
  showContent?: boolean;
  onTitleClick?: MouseEventHandler;
};

function Tab(props: TabProps): JSX.Element {
  const { children, initialActive, active } = props;

  const isUncontrolled = "initialActive" in props;

  const [paneIndexState, setPaneIndexState] = useState(
    isUncontrolled ? initialActive : null
  );
  const selectedPaneIndex = isUncontrolled ? paneIndexState : active;

  function handleTitleClick(index: number) {
    return isUncontrolled
      ? setPaneIndexState(index)
      : props.onActiveChange(index);
  }

  return (
    <div className="tab-container">
      {children.map((child, index) =>
        React.cloneElement(child, {
          showContent: index === selectedPaneIndex,
          key: index,
          onTitleClick: () => handleTitleClick(index),
        })
      )}
    </div>
  );
}

function TabPane(props: TabPaneProps): JSX.Element {
  const {
    children,
    title,
    showContent = true,
    onTitleClick = () => {},
  } = props;

  function renderTitle(): JSX.Element {
    return (
      <button role="tab" onClick={onTitleClick}>
        {title}
      </button>
    );
  }
  return (
    <div className="tab-pane-container">
      {renderTitle()}
      {showContent && children}
    </div>
  );
}

Tab.Pane = TabPane;

export default Tab;
