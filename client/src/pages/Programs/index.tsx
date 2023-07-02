import React, {useState, useCallback, useEffect, useMemo} from "react";
import { Box } from "../../components/ui/Box";
import { SelectInput } from "../../components/ui/SelectInput";
import { useGetProgramList } from "../../hooks/useGetProgramList";
import { useTabataProgram } from "../../hooks/useTabataProgram";
import { MainProgram } from "../../components/Program";
import { IProgramProps } from "../../components/commons/interfaces/ProgramProps";
import { TABATA_EDIT_ENDPOINT, TABATA_SETTINGS_ENDPOINT, TABATA_DELETE_ENDPOINT } from "../../api/endpoints";

export const Programs = () => {
    const [programList, setProgramList] = useState<IProgramProps[]>([])
    const [selectedProgram, setSelectedProgram] = useState<IProgramProps>()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
    const [showSuccessDeleteModal, setSuccessDeleteModal] = useState<boolean>(false)
    const [showSuccessUpdateModal, setSuccessUpdateModal] = useState<boolean>(false)
    const [resetKey, setResetKey] = useState<number>(0)

    const getProgramList = useGetProgramList()
    const getProgramSettings = useTabataProgram(TABATA_SETTINGS_ENDPOINT, "POST")
    const deleteProgramSettings = useTabataProgram(TABATA_DELETE_ENDPOINT, "DELETE")
    const updateProgramSettings = useTabataProgram(TABATA_EDIT_ENDPOINT, "PUT")

    const { title, workTime, restTime, rounds, exercises, _id } = selectedProgram || {}

    useEffect(() => {
        getProgramList().then((result: IProgramProps[]) => {
            setProgramList(result)
        })
    }, [])

    useEffect(() => {
        if (selectedProgram && selectedProgram.value) {
            getProgramSettings({ _id: selectedProgram.value }).then((result: IProgramProps) => {
                setSelectedProgram(result)
            })
        }
    }, [selectedProgram])

    const updateProgramList = useCallback(() => {
        getProgramList().then((result: IProgramProps[]) => {
            setProgramList(result)
        })
    }, [getProgramList])

    useEffect(() => {
        if (showSuccessDeleteModal || showSuccessUpdateModal) {
            updateProgramList()
        }
    }, [showSuccessDeleteModal, showSuccessUpdateModal, updateProgramList])

    const options = useMemo(() => {
        return programList.map((program: IProgramProps) => ({
            label: program.title,
            value: program._id,
        }))
    }, [programList])

    const handleResetSelect = () => {
        setResetKey((prevKey: number) => prevKey + 1)
    }

    const chosenProgram = async (selected: IProgramProps) => {
        await getProgramSettings({_id: selected.value}).then((result: IProgramProps) => {
            setSelectedProgram(result)
        })
    }

    const updatedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedProgram({...selectedProgram, title: event.target.value })
    }

    const updatedWorkTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWorkTime = parseInt(event.target.value)

        if (newWorkTime === 0) {
            return
        }

        setSelectedProgram({...selectedProgram, workTime: newWorkTime})
    }

    const updatedRestTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRestTime = parseInt(event.target.value)

        if (newRestTime === 0) {
            return
        }

        setSelectedProgram({...selectedProgram, restTime: newRestTime})
    }

    const updatedRounds = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRounds = parseInt(event.target.value)

        if (newRounds === 0) {
            return
        }

        setSelectedProgram({...selectedProgram, rounds: newRounds})
    }

    const updatedChangeExercises = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newExercises = [...(exercises || [])]
        newExercises[index] = event.target.value
        setSelectedProgram({...selectedProgram, exercises: newExercises})
    }

    const updatedDeleteExercises = (index: number) => {
        if (exercises?.length && exercises.length <= 1) {
            return
        }

        const newExercises = [...(exercises || [])]
        newExercises.splice(index, 1)
        setSelectedProgram({...selectedProgram, exercises: newExercises})
    }

    const updatedAddExercises = () => {
        setSelectedProgram({...selectedProgram, exercises: [...(exercises || []), ""]})
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
            setSelectedProgram(undefined)
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
            setSelectedProgram(undefined)
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
        const newExerciseList = [...(exercises || [])]
        const [draggedExercise] = newExerciseList.splice(draggedIndex, 1)
        newExerciseList.splice(newIndex, 0, draggedExercise)
        setSelectedProgram({...selectedProgram, exercises: newExerciseList})
    }

    const handleShowUpdateModal = () => {
        setShowUpdateModal(true)
    }

    const mainProgram = {title, workTime, restTime, rounds, exercises, onUpdate, onDelete, handleDragOver, handleDrop, handleDragStart, setShowUpdateModal, showUpdateModal, setShowDeleteModal, showSuccessUpdateModal, showDeleteModal, showSuccessDeleteModal, updatedTitle, updatedWorkTime, updatedRestTime, updatedRounds, updatedAddExercises, updatedChangeExercises, updatedDeleteExercises, handleShowUpdateModal}

    return (
        <Box>
            <SelectInput key={resetKey} options={options} placeholder="Choose program..." onChange={chosenProgram} />
            <br/>
            {selectedProgram && <MainProgram mainProgram={mainProgram}/>}
        </Box>
    )
}