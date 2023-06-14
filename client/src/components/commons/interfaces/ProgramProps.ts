export interface Program {
    _id: string
    title: string
    exercises: string[]
    rounds: number
    workTime: number
    restTime: number
    selected?: object[]
    value?: string
}