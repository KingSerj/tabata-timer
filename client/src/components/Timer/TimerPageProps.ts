export interface TimerPageProps {
    timer: number
    isTimerCounting: boolean
    handlePause: () => void
    handlePlay: () => void
    isStartSoundPlaying: boolean
    currentRound: number
    rounds?: number | undefined
    restExercises: String[]
    currentExerciseIndex: number
}