import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { TimeUnit, ChangeTimeFunction } from "@common/types";
import MinusIcon from "./minus.svg";

type PropsType = {
    changeTime: ChangeTimeFunction;
    unit: TimeUnit;
};

export default function DecreaseButton(props: PropsType) {
    let {changeTime, unit} = props;
    return (
        <ChangeTimeButton action="decrease" unit={unit} changeTime={changeTime}>
            <MinusIcon className="icon"/>
        </ChangeTimeButton>
    );
}
