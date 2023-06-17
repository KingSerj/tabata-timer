import React, { useState } from "react";
import { Box } from "../../components/ui/Box";
import { Typo } from "../../components/ui/Texts/Typo";
import { Small } from "../../components/ui/Texts/Small";
import { Input } from "../../components/ui/Input";
import { Exercise } from "../../components/Exercise";
import { Button } from "../../components/ui/Button";
import { useTabataProgram } from "../../hooks/useTabataProgram";
import { Modal } from "../../components/ui/Modal";
import { TABATA_ADD_ENDPOINT } from "../../api/endpoints";

export const Settings = () => {
    const [programSettings, setProgramSettings] = useState({
        title: "",
        rounds: "",
        workTime: "",
        restTime: "",
        exercises: [""],
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const { title, workTime, restTime, rounds, exercises } = programSettings

    const handleAddExercise = () => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            exercises: [...prevSettings.exercises, ""]
        }))
    }

    const handleDeleteExercise = (index: number) => {
        if (index === 0 || exercises.length <= 1) {
            return
        }

        const updatedExercises = [...exercises]
        updatedExercises.splice(index, 1)
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            exercises: updatedExercises
        }))
    }

    const handleExerciseChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedExercises = [...exercises]
        updatedExercises[index] = event.target.value
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            exercises: updatedExercises
        }))
    }

    const handleTitleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            title: event.target.value,
        }))
    }

    const handleWorkoutTimeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWorkTime = event.target.value

        if (newWorkTime == "0") {
            return
        }

        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            workTime: newWorkTime,
        }))
    }

    const handleRestTimeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRestTime = event.target.value

        if (newRestTime == "0") {
            return
        }

        setProgramSettings((prevSettings) => ({
            ...prevSettings,
            restTime: newRestTime,
        }))
    }

    const handleRoundsAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRounds = event.target.value

        if (newRounds == "0") {
            return
        }

        setProgramSettings((prevSettings) => ({
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
            rounds: "",
            workTime: "",
            restTime: "",
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
            {exercises.map((exercise, index) => (
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