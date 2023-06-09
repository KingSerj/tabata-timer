import React, { ReactNode } from "react";

export interface IUIProps {
    children?: ReactNode
    type?: "number" | "text"
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    label?: string
    value?: string | number
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
}