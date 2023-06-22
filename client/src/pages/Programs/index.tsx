import React, { useState, useCallback, useEffect } from "react";
import { Box } from "../../components/ui/Box";
import { SelectInput } from "../../components/ui/SelectInput";
import { useGetProgramList } from "../../hooks/useGetProgramList";
import { useTabataProgram } from "../../hooks/useTabataProgram";
import { Program } from "../../components/commons/interfaces/ProgramProps";
import { TABATA_EDIT_ENDPOINT, TABATA_SETTINGS_ENDPOINT, TABATA_DELETE_ENDPOINT } from "../../api/endpoints";
import {MainProgram} from "../../components/Program";

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

    const { title, workTime, restTime, rounds, exercises, _id } = selectedProgram || {}

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
            _id: _id
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
            _id: _id,
            title: title,
            rounds: rounds,
            workTime: workTime,
            restTime: restTime,
            exercises: exercises
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

    const mainProgram = {title, workTime, restTime, rounds, exercises, onUpdate, onDelete, handleDragOver, handleDrop, handleDragStart, setShowUpdateModal, showUpdateModal, setShowDeleteModal, showSuccessUpdateModal, showDeleteModal, showSuccessDeleteModal, updatedTitle, updatedWorkTime, updatedRestTime, updatedRounds, updatedAddExercises, updatedChangeExercises, updatedDeleteExercises}

    return (
        <Box>
            <SelectInput key={resetKey} options={options} placeholder="Choose program..." onChange={chosenProgram}/>
            <br/>
            {selectedProgram && <MainProgram mainProgram={mainProgram}/>}
        </Box>
    )
}