import React from "react";

export interface IProgramPageProps {
    title?: string
    workTime?: number | string
    restTime?: number | string
    rounds?: number | string
    exercises?: string[]
    onUpdate?: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>
    onDelete?: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>
    handleDragOver?: (event: React.DragEvent<HTMLDivElement>) => void
    handleDrop?: (event: React.DragEvent<HTMLDivElement>, index: number) => void
    handleDragStart?: (event: React.DragEvent<HTMLDivElement>, index: number) => void
    setShowUpdateModal?: (show: boolean) => void
    showUpdateModal?: boolean
    setShowDeleteModal?: (show: boolean) => void
    showSuccessUpdateModal?: boolean
    showDeleteModal?: boolean
    showSuccessDeleteModal?: boolean
    updatedTitle?: (event: React.ChangeEvent<HTMLInputElement>) => void
    updatedWorkTime?: (event: React.ChangeEvent<HTMLInputElement>) => void
    updatedRestTime?: (event: React.ChangeEvent<HTMLInputElement>) => void
    updatedRounds?: (event: React.ChangeEvent<HTMLInputElement>) => void
    updatedAddExercises?: () => void
    updatedChangeExercises?: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    updatedDeleteExercises?: (index: number) => void
    handleShowUpdateModal?: (e: React.MouseEvent<HTMLButtonElement>) => void
}