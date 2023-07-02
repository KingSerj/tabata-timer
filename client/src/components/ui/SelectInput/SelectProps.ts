import {IProgramProps} from "../../commons/interfaces/ProgramProps";

export interface ISelectProps {
    options?: Array<object>
    placeholder: string
    onChange?: (selected: IProgramProps) => void
    isDisabled?: boolean
}