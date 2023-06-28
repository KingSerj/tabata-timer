import React from "react";
import { Typo } from "../ui/Texts/Typo";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { NoButton, YesButton } from "../ui/Modal/ModalButton/styles";
import { Small } from "../ui/Texts/Small";
import { Exercise } from "../commons/Exercise";
import { IProgramPageProps } from "./ProgramPageProps";
import { v4 as uuidv4 } from "uuid"

export const MainProgram = ({ mainProgram }:{ mainProgram: IProgramPageProps }) => {

    const {title, workTime, restTime, rounds, exercises = [], onUpdate, onDelete, handleDragOver, handleDrop, handleDragStart, setShowUpdateModal, showUpdateModal, setShowDeleteModal, showSuccessUpdateModal, showDeleteModal, showSuccessDeleteModal, updatedTitle, updatedWorkTime, updatedRestTime, updatedRounds, updatedAddExercises, updatedChangeExercises, updatedDeleteExercises, handleShowUpdateModal} = mainProgram
    const disabled = !title || !workTime || !restTime || !rounds || exercises.some((exercise: string) => exercise.trim() === "")

    return (
        <div>
            <Typo>Settings:</Typo>
            <Input label="Program name:" type="text" value={title} onChange={updatedTitle}/>
            <Input label="Workout Time:" type="number" value={workTime} onChange={updatedWorkTime} />
            <Input label="Rest Time:" type="number" value={restTime} onChange={updatedRestTime} />
            <Input label="Rounds:" type="number" value={rounds} onChange={updatedRounds} />
            <Button onClick={handleShowUpdateModal} disabled={disabled}>UPDATE PROGRAM</Button>
            {showUpdateModal &&
                <Modal>
                    Are you sure you want to update this program ?
                    <br/>
                    <YesButton onClick={onUpdate}>YES</YesButton>
                    <NoButton onClick={() => setShowUpdateModal ? setShowUpdateModal(false) : null}>NO</NoButton>
                </Modal>
            }
            {showSuccessUpdateModal && <Modal>Program has been successfully updated!</Modal>}
            <Button onClick={() => setShowDeleteModal ? setShowDeleteModal(true) : null}>DELETE PROGRAM</Button>
            {showDeleteModal &&
                <Modal>
                    Are you sure you want to delete this program ?
                    <br/>
                    <YesButton onClick={onDelete}>YES</YesButton>
                    <NoButton onClick={() => setShowDeleteModal ? setShowDeleteModal(false) : null}>NO</NoButton>
                </Modal>}
            {showSuccessDeleteModal && <Modal>Program has been successfully deleted!</Modal>}
            <Typo>Exercises:</Typo>
            <Button onClick={updatedAddExercises}>ADD EXERCISE</Button>
            <Small>You can change the exercise order by simply dragging the exercise number and releasing it at the desired location.</Small>
            {exercises.map((exercise: string, index: number) => (
                <Exercise
                    key={uuidv4()}
                    draggable
                    index={index + 1}
                    value={exercise}
                    onChange={(event) => updatedChangeExercises ? updatedChangeExercises(event, index) : null}
                    onClick={() => updatedDeleteExercises ? updatedDeleteExercises(index) : null}
                    onDragStart={(event: React.DragEvent<HTMLDivElement>) => handleDragStart ? handleDragStart(event, index) : null}
                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => handleDragOver ? handleDragOver(event) : null}
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => handleDrop ? handleDrop(event, index) : null}
                />
            ))}
        </div>
    )
}