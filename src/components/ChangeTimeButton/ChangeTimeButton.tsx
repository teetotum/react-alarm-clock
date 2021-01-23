import React from "react";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";

export type ActionType = "increase"|"decrease";
export type UnitType   = "hour"|"minute";

type PropsType = {
    unit: UnitType,
    action: ActionType,
    onClick: (e: React.MouseEvent) => void;
};

export default function ChangeTimeButton(props: PropsType) {
    const {unit, action, onClick} = props;
    const icon = (action === "increase") ?
        <PlusIcon  className="icon" /> :
        <MinusIcon className="icon" />

    return (
        <a className="button" data-action={action} data-unit={unit} onClick={onClick}>
            {icon}
        </a>
    );
}
