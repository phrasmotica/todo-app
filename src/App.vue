<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import SettingsModal from './SettingsModal.vue'
import TodoItem from './TodoItem.vue'

import { addItem, getItems, swapItems, deleteItem, checkItem, setItemLabel } from './data'
import { Mode, Priority } from './types'

const items = ref(getItems())
const itemsToShow = computed(() => hideCompleted.value ? items.value.filter(i => !i.done) : items.value)
const completedCount = computed(() => items.value.filter(i => i.done).length)

const mode = ref(Mode.View)
const newItemLabel = ref("")
const newItemPriority = ref(Priority.Medium)

const hideCompleted = ref(false)

const addInput = ref<any>(null)

watch(addInput, () => {
    addInput.value?.focus()
})

const addNewItem = () => {
    if (newItemLabel.value) {
        items.value = addItem(newItemLabel.value, newItemPriority.value)
        newItemLabel.value = ""
    }
}

const check = (id: string, checked: boolean) => {
    items.value = checkItem(id, checked)
}

const setLabel = (id: string, label: string) => {
    items.value = setItemLabel(id, label)
}

const swap = (oldIndex: number, newIndex: number) => {
    items.value = swapItems(oldIndex, newIndex)
}

const deleteExistingItem = (id: string) => {
    items.value = deleteItem(id)
}
</script>

<template>
    <div class="d-flex justify-content-between">
        <h1>To-Do List</h1>

        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#settingsModal">
            <i class="bi bi-gear"></i>
        </button>
    </div>

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
        <div v-if="items.length <= 0">No items to show!</div>

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

    <SettingsModal id="settingsModal"
        :hideCompleted="hideCompleted"
        :completedCount="completedCount"
        @setHideCompleted="v => hideCompleted = v" />
</template>
