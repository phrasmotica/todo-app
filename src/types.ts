export enum Mode { View, Add, Edit }

export interface TodoList {
    id: string
    name: string
}

export interface Item {
    id: string
    label: string
    done: boolean
    priority: Priority
}

export enum Priority {
    High = "high",
    Medium = "medium",
    Low = "low",
}
