import React, { useState, useCallback, useEffect } from "react";
import { Box } from "../../components/ui/Box";
import { SelectInput } from "../../components/ui/SelectInput";
import { useGetProgramList } from "../../hooks/useGetProgramList";
import { useTabataProgram } from "../../hooks/useTabataProgram";
import { Input } from "../../components/ui/Input";
import { Typo } from "../../components/ui/Texts/Typo";
import { Button } from "../../components/ui/Button";
import { Exercise } from "../../components/Exercise";
import { Modal } from "../../components/ui/Modal";
import { NoButton, YesButton } from "../../components/ui/Modal/ModalButton/styles";
import { Small } from "../../components/ui/Texts/Small";
import { Program } from "../../components/commons/interfaces/ProgramProps";
import { TABATA_EDIT_ENDPOINT, TABATA_SETTINGS_ENDPOINT, TABATA_DELETE_ENDPOINT } from "../../api/endpoints";

export const Programs = () => {
    const [programList, setProgramList] = useState<Program[]>([])
    const [selectedProgram, setSelectedProgram] = useState<any>()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showSuccessDeleteModal, setSuccessDeleteModal] = useState(false)
    const [showSuccessUpdateModal, setSuccessUpdateModal] = useState(false)
    const [resetKey, setResetKey] = useState(0)

    const getProgramList = useGetProgramList()
    const getProgramSettings = useTabataProgram(TABATA_SETTINGS_ENDPOINT, "POST")
    const deleteProgramSettings = useTabataProgram(TABATA_DELETE_ENDPOINT, "DELETE")
    const updateProgramSettings = useTabataProgram(TABATA_EDIT_ENDPOINT, "PUT")

    const { title, workTime, restTime, rounds, exercises } = selectedProgram || {}

    useEffect(() => {
        getProgramList().then((result) => {
            setProgramList(result)
        })
    }, [])

    useEffect(() => {
        if (selectedProgram && selectedProgram.value) {
            getProgramSettings({ _id: selectedProgram.value }).then((result) => {
                setSelectedProgram(result)
            })
        }
    }, [selectedProgram])

    const updateProgramList = useCallback(() => {
        getProgramList().then((result) => {
            setProgramList(result)
        })
    }, [getProgramList])

    useEffect(() => {
        if (showSuccessDeleteModal || showSuccessUpdateModal) {
            updateProgramList()
        }
    }, [showSuccessDeleteModal, showSuccessUpdateModal, updateProgramList])

    const options = programList.map((program) => ({
        label: program.title,
        value: program._id,
    }))

    const handleResetSelect = () => {
        setResetKey((prevKey) => prevKey + 1)
    }

    const chosenProgram = async (selected: Program) => {
        await getProgramSettings({_id: selected.value}).then((result) => {
            setSelectedProgram(result)
        })
    }

    const updatedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedProgram({...selectedProgram, title: event.target.value })
    }

    const updatedWorkTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWorkTime = event.target.value

        if (newWorkTime == "0") {
            return
        }

        setSelectedProgram({...selectedProgram, workTime: newWorkTime})
    }

    const updatedRestTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRestTime = event.target.value

        if (newRestTime == "0") {
            return
        }

        setSelectedProgram({...selectedProgram, restTime: newRestTime})
    }

    const updatedRounds = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRounds = event.target.value

        if (newRounds == "0") {
            return
        }

        setSelectedProgram({...selectedProgram, rounds: newRounds})
    }

    const updatedChangeExercises = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newExercises = [...selectedProgram.exercises]
        newExercises[index] = event.target.value
        setSelectedProgram({...selectedProgram, exercises: newExercises})
    }

    const updatedDeleteExercises = (index: number) => {
        if (index === 0 || selectedProgram.exercises.length <= 1 ) {
            return
        }

        const newExercises = [...selectedProgram.exercises]
        newExercises.splice(index, 1)
        setSelectedProgram({...selectedProgram, exercises: newExercises})
    }

    const updatedAddExercises = () => {
        setSelectedProgram({...selectedProgram, exercises: [...selectedProgram.exercises, ""]})
    }

    const onDelete = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        await deleteProgramSettings({
            _id: selectedProgram._id
        })
        await updateProgramList()
        setShowDeleteModal(false)
        setSuccessDeleteModal(true)
        setTimeout(() => {
            setSuccessDeleteModal(false)
            setSelectedProgram(null)
            handleResetSelect()
        }, 1200)
    }

    const onUpdate = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault()
        await updateProgramSettings({
            _id: selectedProgram._id,
            title: selectedProgram.title,
            rounds: selectedProgram.rounds,
            workTime: selectedProgram.workTime,
            restTime: selectedProgram.restTime,
            exercises: selectedProgram.exercises
        })
        setShowUpdateModal(false)
        setSuccessUpdateModal(true)
        setTimeout(() => {
            setSuccessUpdateModal(false)
            setSelectedProgram(null)
            handleResetSelect()
        }, 1200)
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.dataTransfer.setData("text/plain", index.toString())
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, newIndex: number) => {
        const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"))
        const newExerciseList = [...selectedProgram.exercises]
        const [draggedExercise] = newExerciseList.splice(draggedIndex, 1)
        newExerciseList.splice(newIndex, 0, draggedExercise)
        setSelectedProgram({...selectedProgram, exercises: newExerciseList})
    }

    const disabled = !selectedProgram || !selectedProgram.title || !selectedProgram.workTime || !selectedProgram.restTime || !selectedProgram.rounds || selectedProgram.exercises.some((exercise:string) => exercise.trim() === "")

    return (
        <Box>
            <SelectInput
                key={resetKey}
                options={options}
                placeholder="Choose program..."
                onChange={chosenProgram}
            />
            <br/>
            {selectedProgram &&
                <>
                    <Typo>Settings:</Typo>
                    <Input label="Program name:" type="text" value={title} onChange={updatedTitle}/>
                    <Input label="Workout Time:" type="number" value={workTime} onChange={updatedWorkTime} />
                    <Input label="Rest Time:" type="number" value={restTime} onChange={updatedRestTime} />
                    <Input label="Rounds:" type="number" value={rounds} onChange={updatedRounds} />
                    <Button onClick={() => setShowUpdateModal(true)} disabled={disabled}>UPDATE PROGRAM</Button>
                    {showUpdateModal &&
                        <Modal>
                            Are you sure you want to update this program ?
                            <br/>
                            <YesButton onClick={onUpdate}>YES</YesButton>
                            <NoButton onClick={() => setShowUpdateModal(false)}>NO</NoButton>
                        </Modal>
                    }
                    {showSuccessUpdateModal && <Modal>Program has been successfully updated!</Modal>}
                    <Button onClick={() => setShowDeleteModal(true)}>DELETE PROGRAM</Button>
                    {showDeleteModal &&
                        <Modal>
                            Are you sure you want to delete this program ?
                            <br/>
                            <YesButton onClick={onDelete}>YES</YesButton>
                            <NoButton onClick={() => setShowDeleteModal(false)}>NO</NoButton>
                        </Modal>}
                    {showSuccessDeleteModal && <Modal>Program has been successfully deleted!</Modal>}
                    <Typo>Exercises:</Typo>
                    <Button onClick={updatedAddExercises}>ADD EXERCISE</Button>
                    <Small>You can change the exercise order by simply dragging the exercise number and releasing it at the desired location.</Small>
                    {exercises.map((exercise: string, index: number) => (
                        <Exercise
                            key={index}
                            draggable
                            index={index + 1}
                            value={exercise}
                            onChange={(event) => updatedChangeExercises(event, index)}
                            onClick={() => updatedDeleteExercises(index)}
                            onDragStart={(event: React.DragEvent<HTMLDivElement>) => handleDragStart(event, index)}
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => handleDragOver(event)}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => handleDrop(event, index)}
                        />
                    ))}
                </>
            }
        </Box>
    )
}