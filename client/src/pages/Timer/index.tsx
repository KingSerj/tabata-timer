import React, {useCallback, useEffect, useState} from "react";
import {Box} from "../../components/ui/Box";
import {Program} from "../../components/commons/interfaces/ProgramProps";
import {SelectInput} from "../../components/ui/SelectInput";
import {useGetProgramList} from "../../hooks/useGetProgramList";
import {useTabataProgram} from "../../hooks/useTabataProgram";
import {Countdown} from "../../components/Timer/Countdown/styles";
import {TimerButton} from "../../components/Timer/TimerButton";
import {ExerciseBox} from "../../components/Timer/ExerciseBox";
import {Medium} from "../../components/ui/Texts/Medium";
import {Large} from "../../components/ui/Texts/Large";
import { AiOutlinePlayCircle } from "react-icons/ai"
import { AiOutlinePause } from "react-icons/ai"
import {Small} from "../../components/ui/Texts/Small";
import {Modal} from "../../components/ui/Modal";
// @ts-ignore
import countdown from "../../assets/countdown.wav"
// @ts-ignore
import endSound from "../../assets/end.mp3";

export const Timer = () => {
    const [programList, setProgramList] = useState<Program[]>([])
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
    const [restExercises, setRestExercises] = useState<any[]>([])
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0)
    const [timer, setTimer] = useState<number>(0)
    const [isTimerCounting, setIsTimerCounting] = useState<boolean>(false)
    const [currentRound, setCurrentRound] = useState<number>(1)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [resetKey, setResetKey] = useState<number>(0)
    const [isStartSoundPlaying, setIsStartSoundPlaying] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false)

    const getProgramList = useGetProgramList()
    const getProgramSettings = useTabataProgram("http://localhost:3002/api/tabata/settings", "POST")

    const updateProgramList = useCallback(() => {
        getProgramList().then((result) => {
            setProgramList(result)
        })
    }, [getProgramList])

    useEffect(() => {
        updateProgramList()
    }, [updateProgramList])

    const options = programList.map((program) => ({
        label: program.title,
        value: program._id,
    }))

    const chosenProgram = async (selected: any) => {
        await getProgramSettings({_id: selected.value}).then((result) => {
            setSelectedProgram(result)
            setTimer(result?.workTime || 0)
            setCurrentExerciseIndex(0)
            setCurrentRound(1)
            setIsStartSoundPlaying(false)
        })
    }

    const handleResetSelect = () => {
        setResetKey((prevKey) => prevKey + 1)
    }

    const generateNewExercises = () => {
        if (selectedProgram && selectedProgram.exercises) {
            const updatedRestExercises = selectedProgram.exercises.reduce((acc: Array<string>, exercise: string, index: number) => {
                acc.push(exercise)

                if (index !== selectedProgram.exercises.length - 1) {
                    acc.push("Rest")
                }

                if (index === selectedProgram.exercises.length - 1) {
                    acc.push("Rest")
                }

                return acc
            }, [])
            setRestExercises(updatedRestExercises)
        }
    }

    useEffect(() => {
        generateNewExercises()
    }, [selectedProgram])

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTimerCounting) {
                if (timer > 0) {
                    setTimer((prevTimer) => prevTimer - 1);
                    setIsInputDisabled(true);
                } else if (timer === 0 && currentExerciseIndex < restExercises.length - 1) {
                    setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
                    if (restExercises[currentExerciseIndex + 1] === "Rest") {
                        setTimer(selectedProgram?.restTime || 0); // Use default value 0 if restTime is undefined
                    } else {
                        setTimer(selectedProgram?.workTime || 0); // Use default value 0 if workTime is undefined
                    }
                } else if (timer === 0 && currentExerciseIndex === restExercises.length - 1) {
                    if (currentRound < (selectedProgram?.rounds || 0)) { // Use default value 0 if rounds is undefined
                        setIsTimerCounting(false);
                        setTimer(selectedProgram?.workTime || 0); // Use default value 0 if workTime is undefined
                        setCurrentRound((prevRound) => prevRound + 1);
                        setCurrentExerciseIndex(0);
                        generateNewExercises();
                        playStartSound();
                        setIsStartSoundPlaying(true);
                        setTimeout(() => {
                            setIsTimerCounting(true);
                            setIsStartSoundPlaying(false);
                        }, 3000);
                    } else {
                        setIsTimerCounting(false);
                        setShowSuccessModal(true);
                        playFinishSound();
                        setIsStartSoundPlaying(false);
                        setTimeout(() => {
                            setSelectedProgram(null);
                            handleResetSelect();
                            setIsInputDisabled(false);
                            setShowSuccessModal(false);
                        }, 2500);
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [isTimerCounting, timer, currentExerciseIndex, restExercises, selectedProgram, currentRound]);

    const handlePlay = () => {
        if (!isStartSoundPlaying) {
            setIsStartSoundPlaying(true)
            playStartSound()
            setIsInputDisabled(true)
            setTimeout(() => {
                setIsTimerCounting(true)
                setIsStartSoundPlaying(false)
            }, 3150)
        }
    }

    const handlePause = () => {
        setIsTimerCounting(false)
        setIsInputDisabled(false)
        setIsStartSoundPlaying(false)
    };

    const playStartSound = () => {
        new Audio(countdown).play()
    }

    const playFinishSound = () => {
        new Audio(endSound).play()
    }

    return (
        <Box>
            <SelectInput
                options={options}
                placeholder={"Choose program..."}
                onChange={chosenProgram}
                isDisabled={isInputDisabled}
                key={resetKey}
            />
            {showSuccessModal && <Modal>Congratulations on a successful workout!</Modal>}
            {selectedProgram ? (
                <>
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
                        <Small>
                            You can't change the program or pause it once the timer is about to start.
                        </Small>
                    )}
                    {isTimerCounting && (
                        <Small>You can't change the program while the timer is running.</Small>
                    )}
                    <Medium>CURRENT EXERCISE | ROUND {currentRound}/{selectedProgram.rounds}</Medium>
                    <Large>{restExercises[currentExerciseIndex]}</Large>
                    <Medium>UP NEXT</Medium>
                    {restExercises.slice(currentExerciseIndex + 1).map((exercise, index) => (
                        <ExerciseBox key={index}>{exercise}</ExerciseBox>
                    ))}
                </>
            ) : null}
        </Box>
    )
}