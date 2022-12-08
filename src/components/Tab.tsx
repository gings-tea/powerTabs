import React from "react";
import { MouseEventHandler } from "react";
import { useState } from "react";
import "./Tab.scss";

interface TabCommonProps {
  children: React.ReactElement<TabPaneProps>[];
}

export interface TabUncotrolledProps extends TabCommonProps {
  initialActive: number;
  active?: never;
  onActiveChange?: never;
}

export interface TabControlledProps extends TabCommonProps {
  active: number;
  onActiveChange: Function;
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
  const { children } = props;
  const a = "initialActive" in props ? props.initialActive : props.active;
  const [activePaneIndex, setActivePaneIndex] = useState(a);
  return (
    <div className="tab-container">
      {children.map((child, index) =>
        React.cloneElement(child, {
          showContent: index === activePaneIndex,
          key: index,
          onTitleClick: () => setActivePaneIndex(index),
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
    return <h1 onClick={onTitleClick}>{title}</h1>;
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
