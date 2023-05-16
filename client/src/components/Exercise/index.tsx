import React from "react"
import * as SC from "./styles"
import {ExerciseProps} from "./ExerciseProps";

export const Exercise = ({ index, value, onChange, onClick }: ExerciseProps) => {


    return (
        <SC.InputContainer>
            <SC.ExerciseText>Exercise {index}:</SC.ExerciseText>
            <SC.InputWrapper>
                <SC.ExerciseInput value={value} onChange={onChange}/>
                <SC.DeleteButton onClick={onClick}>Delete</SC.DeleteButton>
            </SC.InputWrapper>
        </SC.InputContainer>
    )
}