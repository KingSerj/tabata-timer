import { Countdown } from "./Countdown"
import { TimerButton } from "./TimerButton";
import { AiOutlinePause, AiOutlinePlayCircle } from "react-icons/ai";
import React from "react";
import { Small } from "../ui/Texts/Small";
import { Medium } from "../ui/Texts/Medium";
import { Large } from "../ui/Texts/Large";
import { TimerExerciseBox } from "./TimerExerciseBox";
import { TimerPageProps } from "./TimerPageProps";


export const MainTimer = ({timerProps}: { timerProps: TimerPageProps }) => {

    const { timer, isTimerCounting, handlePause, handlePlay, isStartSoundPlaying, currentRound, rounds, restExercises, currentExerciseIndex } = timerProps

    return (
        <div>
            <Countdown>{timer.toString().padStart(2, "0")}s</Countdown>
            {isTimerCounting ? (
                <TimerButton onClick={handlePause}>
                    <AiOutlinePause/>
                </TimerButton>
            ) : (
                <TimerButton onClick={handlePlay} disabled={isStartSoundPlaying}>
                    <AiOutlinePlayCircle/>
                </TimerButton>
            )}
            {isStartSoundPlaying && (
                <Small>You can't change the program or pause it once the timer is about to start.</Small>
            )}
            {isTimerCounting && (
                <Small>You can't change the program while the timer is running.</Small>
            )}
            <Medium>CURRENT EXERCISE | ROUND {currentRound}/{rounds}</Medium>
            <Large>{restExercises[currentExerciseIndex]}</Large>
            <Medium>UP NEXT</Medium>
            {restExercises.slice(currentExerciseIndex + 1).map((exercise, index) => (
                <TimerExerciseBox key={index}>{exercise}</TimerExerciseBox>
            ))}
        </div>
    )
}