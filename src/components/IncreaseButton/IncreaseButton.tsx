import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { TimeUnit, ChangeTimeFunction } from "@common/types";
import PlusIcon from "./plus.svg";

type PropsType = {
    changeTime: ChangeTimeFunction;
    unit: TimeUnit;
};

export default function IncreaseButton(props: PropsType) {
    let {changeTime, unit} = props;
    return (
        <ChangeTimeButton action="increase" unit={unit} changeTime={changeTime}>
            <PlusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}
