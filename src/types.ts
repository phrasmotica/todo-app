export enum Mode { View, Add, Edit }

export interface TodoList {
    id: string
    name: string
    settings: TodoListSettings
    items: Item[]
}

export const getCompletedCount = (list: TodoList) => {
    return (list.items.filter(i => i.done) || []).length
}

export const sortTodoLists = (x: TodoList, y: TodoList) => x.name.localeCompare(y.name)

export interface TodoListSettings {
    hideCompleted: boolean
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
