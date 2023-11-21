import { v4 as uuidv4 } from "uuid"

import { Item, Priority, TodoList } from "./types"

export const getData = () => (JSON.parse(localStorage.getItem("data")) || []) as TodoList[]

const setData = (data: TodoList[]) => {
    localStorage.setItem("data", JSON.stringify(data))
}

export const getItems = () => (JSON.parse(localStorage.getItem("items")) || []) as Item[]

const setItems = (items: Item[]) => {
    localStorage.setItem("items", JSON.stringify(items))
}

export const addList = (name: string) => {
    const lists = getData()

    lists.unshift({
        id: uuidv4(),
        name,
    })

    setData(lists)

    return lists
}

export const addItem = (listId: string, label: string, priority: Priority) => {
    const items = getItems()

    items.unshift({
        id: uuidv4(),
        listId,
        label,
        priority,
        done: false,
    })

    setItems(items)

    return items
}

export const setItemLabel = (id: string, label: string) => {
    const items = getItems()

    items.find(i => i.id === id).label = label

    setItems(items)

    return items
}

export const checkItem = (id: string, checked: boolean) => {
    const items = getItems()

    items.find(i => i.id === id).done = checked

    setItems(items)

    return items
}

export const swapItems = (oldIndex: number, newIndex: number) => {
    const items = getItems();

    [items[oldIndex], items[newIndex]] = [items[newIndex], items[oldIndex]]

    setItems(items)

    return items
}

export const deleteItem = (id: string) => {
    const items = getItems()
    const index = items.findIndex(i => i.id === id)

    items.splice(index, 1)

    setItems(items)

    return items
}
