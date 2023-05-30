import React from "react"
import * as SC from "./styles"
import {ExerciseProps} from "./ExerciseProps";

export const Exercise = ({ index, value, onChange, onClick, draggable, onDragStart, onDragOver, onDrop }: ExerciseProps) => {

    return (
        <SC.InputContainer>
            <SC.ExerciseText draggable onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}>Exercise {index}:</SC.ExerciseText>
            <SC.InputWrapper>
                <SC.ExerciseInput value={value} onChange={onChange}/>
                <SC.DeleteButton onClick={onClick}>Delete</SC.DeleteButton>
            </SC.InputWrapper>
        </SC.InputContainer>
    )
}