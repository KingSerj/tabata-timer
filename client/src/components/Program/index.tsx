import {Typo} from "../ui/Texts/Typo";
import {Input} from "../ui/Input";
import {Button} from "../ui/Button";
import {Modal} from "../ui/Modal";
import {NoButton, YesButton} from "../ui/Modal/ModalButton/styles";
import {Small} from "../ui/Texts/Small";
import {Exercise} from "../commons/Exercise";
import React from "react";
import {ProgramPageProps} from "./ProgramPageProps";

export const MainProgram = ({ mainProgram }:{ mainProgram: ProgramPageProps }) => {

    const {title, workTime, restTime, rounds, exercises, onUpdate, onDelete, handleDragOver, handleDrop, handleDragStart, setShowUpdateModal, showUpdateModal, setShowDeleteModal, showSuccessUpdateModal, showDeleteModal, showSuccessDeleteModal, updatedTitle, updatedWorkTime, updatedRestTime, updatedRounds, updatedAddExercises, updatedChangeExercises, updatedDeleteExercises} = mainProgram
    const disabled = !title || !workTime || !restTime || !rounds || exercises.some((exercise: string) => exercise.trim() === "")

    return (
        <div>
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
        </div>
    )
}