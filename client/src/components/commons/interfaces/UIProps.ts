import React, {ReactNode} from "react";

export interface UIProps {
    children?: ReactNode;
    type?: "number" | "text";
    onClick?: any;
    label?: string;
    value?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    disabled?: boolean;
    props?: any;
}