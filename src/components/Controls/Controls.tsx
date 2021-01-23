import React, { useState } from "react";
import ChangeTimeButton, { UnitType, ActionType } from "@components/ChangeTimeButton";
import StartButton from "@components/StartButton";
import "./Controls.scss";

type PropsType = {
    isOn: boolean;
    onStartButtonClick: () => void;
    onChangeTimeButtonClick: (actionType: ActionType, unit: UnitType) => void;
};

export default function Controls(props: PropsType) {
    const {isOn, onStartButtonClick, onChangeTimeButtonClick} = props;

    const _onChangeTimeButtonClick = (e: React.MouseEvent) => {
        let anchor = e.currentTarget as HTMLAnchorElement;
        let action = anchor.dataset.action as ActionType;
        let unit   = anchor.dataset.unit   as UnitType;
        onChangeTimeButtonClick(action, unit);
    }

    return (
        <div className="controls">
            {!isOn &&
            <>
            <ChangeTimeButton unit="hour" action="increase" onClick={_onChangeTimeButtonClick} />
            <ChangeTimeButton unit="hour" action="decrease" onClick={_onChangeTimeButtonClick} />
            </>
            }
            <StartButton isOn={isOn} onClick={onStartButtonClick} />
            {!isOn &&
            <>
            <ChangeTimeButton unit="minute" action="increase" onClick={_onChangeTimeButtonClick} />
            <ChangeTimeButton unit="minute" action="decrease" onClick={_onChangeTimeButtonClick} />
            </>
            }
        </div>
    );
}
