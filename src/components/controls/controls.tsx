import React, { useState } from "react";
import "./controls.scss";

export type ActionType = "increase"|"decrease";
export type UnitType   = "hour"|"minute";

type PropsType = {
    isOn: boolean;
    onStartButtonClick: () => void;
    onChangeTimeButtonClick: (actionType: ActionType, unit: UnitType) => void;
};

export default function Controls(props: PropsType) {
    const {isOn, onStartButtonClick, onChangeTimeButtonClick} = props;

    const _onChangeTimeButtonClick = (e: React.MouseEvent) => {
        let button = e.target as HTMLButtonElement;
        let action = button.dataset.action as ActionType;
        let unit   = button.dataset.unit   as UnitType;
        onChangeTimeButtonClick(action, unit);
    }

    const [left, right] = (() => {
        if (isOn) return [null, null];
        return [
            <>
            <button className="button" type="button" onClick={_onChangeTimeButtonClick} data-action="increase" data-unit="hour">+</button>
            <button className="button" type="button" onClick={_onChangeTimeButtonClick} data-action="decrease" data-unit="hour">-</button>
            </>,
            <>
            <button className="button" type="button" onClick={_onChangeTimeButtonClick} data-action="increase" data-unit="minute">+</button>
            <button className="button" type="button" onClick={_onChangeTimeButtonClick} data-action="decrease" data-unit="minute">-</button>
            </>
        ];
    })();

    return (
        <div className="controls">
            {left}
            <button id="start-button" className={`button ${isOn ? "on" : "off"}`} type="button" onClick={onStartButtonClick}>&gt;</button>
            {right}
        </div>
    );
}
