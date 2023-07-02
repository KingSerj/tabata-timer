import React from "react"
import * as SC from "./styles"
import { IExerciseProps } from "./ExerciseProps";

export const Exercise = ({ index, value, onChange, onClick, onDragStart, onDragOver, onDrop }: IExerciseProps) => (
    <SC.InputContainer>
        <SC.ExerciseText draggable onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}>Exercise {index}:</SC.ExerciseText>
        <SC.InputWrapper>
            <SC.ExerciseInput value={value} onChange={onChange}/>
            <SC.DeleteButton onClick={onClick}>Delete</SC.DeleteButton>
        </SC.InputWrapper>
    </SC.InputContainer>
)
