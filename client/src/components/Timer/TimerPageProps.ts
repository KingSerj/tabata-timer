export interface ITimerPageProps {
    timer: number
    isTimerCounting: boolean
    handlePause: () => void
    handlePlay: () => void
    isStartSoundPlaying: boolean
    currentRound: number
    rounds?: number | string | undefined
    restExercises: String[]
    currentExerciseIndex: number
}