<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Item { label: string, done: boolean }

enum Mode { View, Add, Edit }

const items = ref([] as Item[])
const itemsToShow = computed(() => hideCompleted.value ? items.value.filter(i => !i.done) : items.value)
const completedCount = computed(() => items.value.filter(i => i.done).length)

const mode = ref(Mode.View)
const newItemLabel = ref("")

const hideCompleted = ref(false)

const addInput = ref<any>(null)

watch(addInput, () => {
    addInput.value?.focus()
})

const addNewItem = (e: Event) => {
    e.preventDefault()

    if (newItemLabel.value) {
        items.value = [{
            label: newItemLabel.value.trim(),
            done: false,
        }, ...items.value]

        newItemLabel.value = ""
    }
}

const reorder = (oldIndex: number, newIndex: number) => {
    const newItems = [...items.value] as Item[]

    [newItems[oldIndex], newItems[newIndex]] = [newItems[newIndex], newItems[oldIndex]]

    items.value = newItems
}

const deleteItem = (index: number) => {
    const newItems = [...items.value] as Item[]

    newItems.splice(index, 1)

    items.value = newItems
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
            <form @submit="addNewItem">
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

        <div v-else
            class="form-check d-flex align-items-center"
            :class="[
                idx > 0 && 'pt-2',
                idx > 0 && mode === Mode.View && 'border-top border-dark border-opacity-10'
            ]"
            v-for="(item, idx) in itemsToShow">
            <input
                :id="'input-' + idx"
                class="form-check-input mb-1 flex-shrink-0"
                type="checkbox"
                :disabled="mode === Mode.Edit"
                v-model="item.done" />

            <label v-if="mode !== Mode.Edit" class="form-control-plaintext ms-2" :for="'input-' + idx">
                {{ item.label }}
            </label>

            <input v-else-if="mode === Mode.Edit" class="form-control ms-2" v-model="item.label" />

            <div v-if="mode === Mode.Edit" class="btn-group ms-2" role="group">
                <button class="btn btn-warning" :disabled="idx <= 0" @click="reorder(idx, idx - 1)">
                    <i class="bi bi-arrow-up"></i>
                </button>

                <button class="btn btn-warning" :disabled="idx >= itemsToShow.length - 1" @click="reorder(idx, idx + 1)">
                    <i class="bi bi-arrow-down"></i>
                </button>
            </div>

            <div v-if="mode === Mode.Edit" class="ms-2">
                <button class="btn btn-danger" @click="deleteItem(idx)">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

        <div v-if="hideCompleted"
            class="text-muted"
            :class="itemsToShow.length > 0 && 'pt-2 border-top border-dark border-opacity-10'">
            {{ completedCount }} completed item(s)
        </div>
    </div>
</template>
