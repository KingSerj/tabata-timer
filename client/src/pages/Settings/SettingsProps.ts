import React from "react";

export interface SettingsProps {
    event?: React.ChangeEvent<HTMLInputElement>
    index?: number
    title: string;
    rounds: string;
    workTime: string;
    restTime: string;
    exercises: string[]
}