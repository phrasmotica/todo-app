export enum Mode { View, Add, Edit }

export interface TodoList {
    id: string
    name: string
}

export const sortTodoLists = (x: TodoList, y: TodoList) => x.name.localeCompare(y.name)

export interface Item {
    id: string
    listId: string
    label: string
    done: boolean
    priority: Priority
}

export enum Priority {
    High = "high",
    Medium = "medium",
    Low = "low",
}
