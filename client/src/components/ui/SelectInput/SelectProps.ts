export interface SelectProps {
    options?: Array<object>
    placeholder: string
    onChange?: (selected: any) => Promise<void>
    isDisabled?: boolean
}