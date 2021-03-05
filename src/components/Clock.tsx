import React from "react";
import type { HTMLAttributesFunctionComponent } from '@types';
import { formatTime } from "@src/time";
import "./Clock.scss";

type ClockProps = { time: types.Time };

export const Clock: HTMLAttributesFunctionComponent<ClockProps> = ({ time }) => (
    <div className="Clock">
        <span className="Clock_fg">{formatTime(time)}</span>
        <span className="Clock_bg">88:88</span>
    </div>
);
