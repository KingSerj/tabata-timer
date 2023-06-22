import React, { useCallback, useEffect, useState, useRef } from "react";
import { Box } from "../../components/ui/Box";
import { Program } from "../../components/commons/interfaces/ProgramProps";
import { SelectInput } from "../../components/ui/SelectInput";
import { useGetProgramList } from "../../hooks/useGetProgramList";
import { useTabataProgram } from "../../hooks/useTabataProgram";
import { Modal } from "../../components/ui/Modal";
import startSound from "../../assets/start.wav";
import endSound from "../../assets/end.mp3";
import { TABATA_SETTINGS_ENDPOINT } from "../../api/endpoints";
import {MainTimer} from "../../components/Timer";

const REST = "Rest"

export const Timer = () => {
    const [programList, setProgramList] = useState<Program[]>([])
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
    const [restExercises, setRestExercises] = useState<String[]>([])
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0)
    const [timer, setTimer] = useState<number>(0)
    const [isTimerCounting, setIsTimerCounting] = useState<boolean>(false)
    const [currentRound, setCurrentRound] = useState<number>(1)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [resetKey, setResetKey] = useState<number>(0)
    const [isStartSoundPlaying, setIsStartSoundPlaying] = useState(false)
    const [isInputDisabled, setIsInputDisabled] = useState(false)

    const getProgramList = useGetProgramList()
    const getProgramSettings = useTabataProgram(TABATA_SETTINGS_ENDPOINT, "POST")

    const startSoundRef = useRef<HTMLAudioElement>(null)
    const finishSoundRef = useRef<HTMLAudioElement>(null)

    const { workTime, restTime, rounds, exercises } = selectedProgram || {}

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

    const chosenProgram = async (selected: Program) => {
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

    const generateNewExercises = useCallback(() => {
        if (exercises) {
            const updatedRestExercises = exercises.reduce((acc: Array<string>, exercise: string) => {
                acc.push(exercise)

                acc.push(REST)

                return acc
            }, [])
            setRestExercises(updatedRestExercises)
        }
    }, [exercises])

    useEffect(() => {
        generateNewExercises()
    }, [selectedProgram])

    useEffect(() => {
        const startWork = () => {
            if (!isTimerCounting) {
                return
            }

            if (timer > 0) {
                setTimer((prevTimer) => prevTimer - 1)
                setIsInputDisabled(true)

                return
            }

            if (timer !== 0) {
                return
            }

            if (currentExerciseIndex < restExercises.length - 1) {
                setCurrentExerciseIndex((prevIndex) => prevIndex + 1)

                let time = workTime || 0

                if (restExercises[currentExerciseIndex + 1] === REST) {
                    time = restTime || 0
                }

                setTimer(time)
                return
            }

            if (currentExerciseIndex !== restExercises.length - 1) {
                return
            }

            if (currentRound < (rounds || 0)) {
                setIsTimerCounting(false)
                setTimer(workTime || 0)
                setCurrentRound((prevRound) => prevRound + 1)
                setCurrentExerciseIndex(0)
                playStartSound()
                setIsStartSoundPlaying(true)

                return
            }

            setIsTimerCounting(false)
            setShowSuccessModal(true)
            playFinishSound()
            setIsStartSoundPlaying(false)
        }
        const interval = setInterval(() => {
            startWork()
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [isTimerCounting, timer, currentExerciseIndex, restExercises, selectedProgram, currentRound])

    const handlePlay = () => {
        if (!isStartSoundPlaying) {
            setIsStartSoundPlaying(true)
            playStartSound()
            setIsInputDisabled(true)
        }
    }

    const handlePause = () => {
        setIsTimerCounting(false)
        setIsInputDisabled(false)
        setIsStartSoundPlaying(false)
    }

    const playStartSound = () => {
        startSoundRef.current?.play()
    }

    const playFinishSound = () => {
        finishSoundRef.current?.play()
    }

    const handleStartSoundEnded = () => {
        setIsTimerCounting(true)
        setIsStartSoundPlaying(false)
    }

    const handleFinishSoundEnded = () => {
        setSelectedProgram(null)
        handleResetSelect()
        setIsInputDisabled(false)
        setShowSuccessModal(false)
    }

    const timerProps = {
        timer,
        isTimerCounting,
        handlePlay,
        handlePause,
        isStartSoundPlaying,
        currentRound,
        rounds,
        restExercises,
        currentExerciseIndex
    }

    return (
        <Box>
            <SelectInput options={options} placeholder="Choose program..." onChange={chosenProgram} isDisabled={isInputDisabled} key={resetKey}/>
            {showSuccessModal && <Modal>Congratulations on a successful workout!</Modal>}
            {selectedProgram && <MainTimer timerProps={timerProps}/>}
            <audio ref={startSoundRef} src={startSound} onEnded={handleStartSoundEnded} />
            <audio ref={finishSoundRef} src={endSound} onEnded={handleFinishSoundEnded} />
        </Box>
    )
}