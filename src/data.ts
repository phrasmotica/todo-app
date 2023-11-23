import { v4 as uuidv4 } from "uuid"

import { Item, Priority, TodoList } from "./types"

export const getData = () => (JSON.parse(localStorage.getItem("data")) || []) as TodoList[]

const setData = (data: TodoList[]) => {
    localStorage.setItem("data", JSON.stringify(data))
}

export const getList = (listId: string) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    return list
}

export const addList = (name: string) => {
    const lists = getData()

    const newList = {
        id: uuidv4(),
        name,
        items: [],
    } as TodoList

    lists.push(newList)

    setData(lists)

    return newList
}

export const deleteList = (id: string) => {
    const lists = getData()

    const index = lists.findIndex(l => l.id === id)
    if (index >= 0) {
        lists.splice(index, 1)

        setData(lists)

        return true
    }

    return false
}

export const setListName = (listId: string, name: string) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    list.name = name

    setData(data)

    return list
}

export const addItem = (listId: string, label: string, priority: Priority) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    const newItem = {
        id: uuidv4(),
        label,
        priority,
        done: false,
    }

    list.items.unshift(newItem)

    setData(data)

    return newItem
}

export const setItemLabel = (listId: string, id: string, label: string) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    const item = list.items.find(i => i.id === id)
    if (!list) {
        throw `Item ${id} does not exist`
    }

    item.label = label

    setData(data)

    return item
}

export const checkItem = (listId: string, id: string, checked: boolean) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    const item = list.items.find(i => i.id === id)
    if (!list) {
        throw `Item ${id} does not exist`
    }

    item.done = checked

    setData(data)

    return item
}

export const swapItems = (listId: string, oldIndex: number, newIndex: number) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    const items = list.items;

    [items[oldIndex], items[newIndex]] = [items[newIndex], items[oldIndex]]

    setData(data)

    return true
}

export const deleteItem = (listId: string, id: string) => {
    const data = getData()

    const list = data.find(l => l.id === listId)
    if (!list) {
        throw `List ${listId} does not exist`
    }

    const index = list.items.findIndex(i => i.id === id)

    list.items.splice(index, 1)

    setData(data)

    return true
}

export const moveItems = (sourceListId: string, destinationListId: string, items: string[]) => {
    const data = getData()

    const sourceList = data.find(l => l.id === sourceListId)
    if (!sourceList) {
        throw `List ${sourceListId} does not exist`
    }

    const destinationList = data.find(l => l.id === destinationListId)
    if (!destinationList) {
        throw `List ${destinationListId} does not exist`
    }

    for (const id of items) {
        const sourceItem = sourceList.items.find(i => i.id === id)
        destinationList.items.push(sourceItem)
    }

    sourceList.items = sourceList.items.filter(i => !items.includes(i.id))

    setData(data)

    return true
}
