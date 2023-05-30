import React from "react";

export interface ExerciseProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onClick?: () => void;
    value?: string;
    index?: number;
    draggable?: boolean
    onDragStart?: React.DragEventHandler<HTMLDivElement>
    onDragOver?: React.DragEventHandler<HTMLDivElement>
    onDrop?: React.DragEventHandler<HTMLDivElement>
}