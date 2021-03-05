import type { FunctionComponent, HTMLAttributes } from 'react';

export type HTMLAttributesFunctionComponent<TProps = {}> = FunctionComponent<TProps & HTMLAttributes<Element>>;

export enum AlarmClockMode { IDLE, ARMED, FIRED }
