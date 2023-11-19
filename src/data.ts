interface Item { label: string, done: boolean }

export const getItems = () => (JSON.parse(localStorage.getItem("items")) || []) as Item[]

const setItems = (items: Item[]) => {
    localStorage.setItem("items", JSON.stringify(items))
}

export const addItem = (label: string) => {
    const items = getItems()

    items.unshift({
        label,
        done: false,
    })

    setItems(items)

    return items
}

export const setItemLabel = (index: number, label: string) => {
    const items = getItems()

    items[index].label = label

    setItems(items)

    return items
}

export const checkItem = (index: number, checked: boolean) => {
    const items = getItems()

    items[index].done = checked

    setItems(items)

    return items
}

export const swapItems = (oldIndex: number, newIndex: number) => {
    const items = getItems() as Item[]

    [items[oldIndex], items[newIndex]] = [items[newIndex], items[oldIndex]]

    setItems(items)

    return items
}

export const deleteItem = (index: number) => {
    const items = getItems()

    items.splice(index, 1)

    setItems(items)

    return items
}
