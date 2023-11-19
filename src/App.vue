<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import TodoItem from './TodoItem.vue'

import { addItem, getItems, swapItems, deleteItem, checkItem, setItemLabel } from './data'
import { Mode } from './types'

const items = ref(getItems())
const itemsToShow = computed(() => hideCompleted.value ? items.value.filter(i => !i.done) : items.value)
const completedCount = computed(() => items.value.filter(i => i.done).length)

const mode = ref(Mode.View)
const newItemLabel = ref("")

const hideCompleted = ref(false)

const addInput = ref<any>(null)

watch(addInput, () => {
    addInput.value?.focus()
})

const addNewItem = () => {
    if (newItemLabel.value) {
        items.value = addItem(newItemLabel.value)
        newItemLabel.value = ""
    }
}

const check = (index: number, checked: boolean) => {
    items.value = checkItem(index, checked)
}

const setLabel = (index: number, label: string) => {
    items.value = setItemLabel(index, label)
}

const swap = (oldIndex: number, newIndex: number) => {
    items.value = swapItems(oldIndex, newIndex)
}

const deleteExistingItem = (index: number) => {
    items.value = deleteItem(index)
}
</script>

<template>
    <h1>To-Do List</h1>

    <div class="form-check mt-2">
        <input id="input-hidecompleted" class="form-check-input" type="checkbox" v-model="hideCompleted" />
        <label class="form-check-label" for="input-hidecompleted">Hide completed items ({{ completedCount }})</label>
    </div>

    <hr />

    <div>
        <div v-if="mode === Mode.View" class="btn-group w-100" role="group">
            <button class="btn btn-primary" @click="mode = Mode.Add">Add new item</button>
            <button class="btn btn-warning" :disabled="items.length <= 0" @click="mode = Mode.Edit">Edit items</button>
        </div>

        <div v-else-if="mode === Mode.Add">
            <form @submit.prevent="addNewItem">
                <input class="mb-2 form-control" ref="addInput" placeholder="New item" v-model="newItemLabel" />

                <div class="btn-group w-100" role="group">
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
                @check="c => check(idx, c)"
                @setLabel="l => setLabel(idx, l)"
                @moveUp="swap(idx, idx - 1)"
                @moveDown="swap(idx, idx + 1)"
                @delete="deleteExistingItem(idx)" />
        </div>

        <div v-if="hideCompleted"
            class="text-muted"
            :class="itemsToShow.length > 0 && 'pt-2 border-top border-dark border-opacity-10'">
            {{ completedCount }} completed item(s)
        </div>
    </div>
</template>

<style scoped lang="css">
.todo-item {
    border-radius: 0.5em;
}

.todo-item.completed {
    background-color: rgb(147, 255, 147);
}
</style>
