export interface IProgramProps {
    _id?: string
    title?: string
    restTime?: number | string
    workTime?: number | string
    rounds?: number | string
    exercises?: Array<string>
    value?: string
    selected?: object[]
}