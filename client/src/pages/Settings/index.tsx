import React, { useState } from "react";
import { Box } from "../../components/ui/Box";
import { Typo } from "../../components/ui/Texts/Typo";
import { Small } from "../../components/ui/Texts/Small";
import { Input } from "../../components/ui/Input";
import { Exercise } from "../../components/commons/Exercise";
import { Button } from "../../components/ui/Button";
import { useTabataProgram } from "../../hooks/useTabataProgram";
import { Modal } from "../../components/ui/Modal";
import { TABATA_ADD_ENDPOINT } from "../../api/endpoints";
import { IProgramProps } from "../../components/commons/interfaces/ProgramProps";

export const Settings = () => {
    const [programSettings, setProgramSettings] = useState<IProgramProps>({
        title: "",
        rounds: parseInt(""),
        workTime: parseInt(""),
        restTime: parseInt(""),
        exercises: [""],
    })
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

    const { title, workTime, restTime, rounds, exercises = [] } = programSettings

    const handleAddExercise = () => {
        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            exercises: [...(prevSettings.exercises || []), ""]
        }))
    }

    const handleDeleteExercise = (index: number) => {
        if (exercises?.length && exercises.length <= 1) {
            return
        }

        const updatedExercises = [...(exercises || [])]
        updatedExercises.splice(index, 1)
        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            exercises: updatedExercises
        }))
    }

    const handleExerciseChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedExercises = [...(exercises || [])]
        updatedExercises[index] = event.target.value
        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            exercises: updatedExercises
        }))
    }

    const handleTitleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            title: event.target.value,
        }))
    }

    const handleWorkoutTimeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWorkTime = parseInt(event.target.value)

        if (newWorkTime === 0) {
            return
        }

        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            workTime: newWorkTime,
        }))
    }

    const handleRestTimeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRestTime = parseInt(event.target.value)

        if (newRestTime === 0) {
            return
        }

        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            restTime: newRestTime,
        }))
    }

    const handleRoundsAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRounds = parseInt(event.target.value)

        if (newRounds === 0) {
            return
        }

        setProgramSettings((prevSettings: IProgramProps) => ({
            ...prevSettings,
            rounds: newRounds,
        }))
    }

    const savedProgram = useTabataProgram(TABATA_ADD_ENDPOINT, "POST")

    const onSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await savedProgram({
            title: title,
            rounds: rounds,
            exercises: exercises,
            workTime: workTime,
            restTime: restTime,
        })
        setProgramSettings({
            title: "",
            rounds: parseInt(""),
            workTime: parseInt(""),
            restTime: parseInt(""),
            exercises: [""],
        })
        setShowSuccessModal(true)

        setTimeout(() => {
            setShowSuccessModal(false)
        }, 1200)
    }

    const hasEmptyExercises = exercises.some((exercise) => !exercise.trim())

    const disabled = !title || !rounds || !workTime || !restTime || hasEmptyExercises

    return (
        <Box>
            <Typo>Settings:</Typo>
            <br />
            <Small>Time should be in seconds, ex: 1 min = 60s.</Small>
            <Input label="Program name:" type="text" value={title} onChange={handleTitleAdd}  />
            <Input label="Workout Time:" type="number" value={workTime} onChange={handleWorkoutTimeAdd} />
            <Input label="Rest Time:" type="number" value={restTime} onChange={handleRestTimeAdd} />
            <Input label="Rounds:" type="number" value={rounds} onChange={handleRoundsAdd} />
            <Button onClick={onSave} disabled={disabled}>SAVE PROGRAM</Button>
            {showSuccessModal && <Modal>Program has been successfully saved!</Modal>}
            <Typo>Exercises:</Typo>
            <Button onClick={handleAddExercise}>ADD EXERCISE</Button>
            {exercises.map((exercise: string, index: number) => (
                <Exercise
                    key={index}
                    index={index + 1}
                    value={exercise}
                    onChange={(event) => handleExerciseChange(event, index)}
                    onClick={() => handleDeleteExercise(index)}
                />
            ))}
        </Box>
    )
}