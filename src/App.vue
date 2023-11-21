<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import NewListModal from './NewListModal.vue'
import SettingsModal from './SettingsModal.vue'
import TodoItem from './TodoItem.vue'

import { addItem, swapItems, deleteItem, checkItem, setItemLabel, getData, addList } from './data'
import { Mode, Priority, sortTodoLists } from './types'

const getLists = () => getData().sort(sortTodoLists)

const lists = ref(getLists())
const selectedListId = ref("")

if (lists.value.length > 0) {
    selectedListId.value = lists.value[0].id
}

const list = computed(() => lists.value.find(l => l.id === selectedListId.value))
const items = computed(() => list.value?.items || [])
const itemsToShow = computed(() => hideCompleted.value ? items.value.filter(i => !i.done) : items.value)

const getCompletedCount = (listId: string) => {
    const list = lists.value.find(l => l.id === listId)
    return (list.items.filter(i => i.done) || []).length
}

const completedCount = computed(() => getCompletedCount(selectedListId.value))

const mode = ref(Mode.View)
const newItemLabel = ref("")
const newItemPriority = ref(Priority.Medium)

const hideCompleted = ref(false)

const addInput = ref<any>(null)

watch(addInput, () => {
    addInput.value?.focus()
})

const addNewList = (name: string) => {
    if (name) {
        const newList = addList(name)
        selectedListId.value = newList.id

        lists.value = getLists()
    }
}

const addNewItem = () => {
    if (newItemLabel.value) {
        addItem(selectedListId.value, newItemLabel.value, newItemPriority.value)
        lists.value = getLists()
        newItemLabel.value = ""
    }
}

const check = (id: string, checked: boolean) => {
    checkItem(selectedListId.value, id, checked)
    lists.value = getLists()
}

const setLabel = (id: string, label: string) => {
    setItemLabel(selectedListId.value, id, label)
    lists.value = getLists()
}

const swap = (oldIndex: number, newIndex: number) => {
    swapItems(selectedListId.value, oldIndex, newIndex)
    lists.value = getLists()
}

const deleteExistingItem = (id: string) => {
    deleteItem(selectedListId.value, id)
    lists.value = getLists()
}
</script>

<template>
    <div class="d-flex justify-content-between">
        <h1>To-Do List</h1>

        <div class="d-flex align-items-center">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newListModal">
                <i class="bi bi-plus-lg"></i>
            </button>

            <button class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#settingsModal">
                <i class="bi bi-gear"></i>
            </button>
        </div>
    </div>

    <select class="form-select" v-model="selectedListId">
        <option v-for="list in lists" :value="list.id">
            {{ list.name }} ({{ getCompletedCount(list.id) }}/{{ list.items.length }})
        </option>
    </select>

    <hr />

    <div>
        <div v-if="mode === Mode.View" class="btn-group w-100" role="group">
            <button class="btn btn-primary" @click="mode = Mode.Add">Add new item</button>
            <button class="btn btn-warning" :disabled="items.length <= 0" @click="mode = Mode.Edit">Edit items</button>
        </div>

        <div v-else-if="mode === Mode.Add">
            <form @submit.prevent="addNewItem">
                <div class="row">
                    <div class="col-9">
                        <input class="form-control" ref="addInput" placeholder="New item" v-model="newItemLabel" />
                    </div>

                    <div class="col-3">
                        <select class="form-select" v-model="newItemPriority">
                            <option v-for="p in Priority" :value="p">{{ p }}</option>
                        </select>
                    </div>
                </div>

                <div class="btn-group w-100 mt-2" role="group">
                    <button class="btn btn-success" :disabled="!newItemLabel" type="submit">Add</button>
                    <button class="btn btn-danger" type="reset" @click="mode = Mode.View">Cancel</button>
                </div>
            </form>
        </div>

        <div v-else-if="mode === Mode.Edit">
            <button class="btn btn-success w-100" @click="mode = Mode.View">Finished</button>
        </div>
    </div>

    <div class="mt-2">
        <div v-if="itemsToShow.length <= 0">No items to show!</div>

        <div v-else>
            <TodoItem v-for="(item, idx) in itemsToShow"
                :mode="mode"
                :item="item"
                :index="idx"
                :total="itemsToShow.length"
                @check="c => check(item.id, c)"
                @setLabel="l => setLabel(item.id, l)"
                @moveUp="swap(idx, idx - 1)"
                @moveDown="swap(idx, idx + 1)"
                @delete="deleteExistingItem(item.id)" />
        </div>

        <div v-if="hideCompleted"
            class="text-muted"
            :class="itemsToShow.length > 0 && 'pt-2 border-top border-dark border-opacity-10'">
            {{ completedCount }} completed item(s)
        </div>
    </div>

    <NewListModal id="newListModal"
        @addNewList="addNewList" />

    <SettingsModal id="settingsModal"
        :hideCompleted="hideCompleted"
        :completedCount="completedCount"
        @setHideCompleted="v => hideCompleted = v" />
</template>
