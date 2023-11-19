<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Item { label: string, done: boolean }

const items = ref([] as Item[])
const itemsToShow = computed(() => hideCompleted.value ? items.value.filter(i => !i.done) : items.value)
const completedCount = computed(() => items.value.filter(i => i.done).length)

const isAddMode = ref(false)
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
</script>

<template>
    <h1>To-Do List</h1>

    <div class="form-check mt-2">
        <input id="input-hidecompleted" class="form-check-input" type="checkbox" v-model="hideCompleted" />
        <label class="form-check-label" for="input-hidecompleted">Hide completed items ({{ completedCount }})</label>
    </div>

    <hr />

    <div>
        <div v-if="!isAddMode">
            <button class="btn btn-primary w-100" @click="isAddMode = true">Add new item</button>
        </div>

        <div v-else>
            <form @submit="addNewItem">
                <input class="mb-2 form-control" ref="addInput" placeholder="New item" v-model="newItemLabel" />

                <div class="btn-group w-100" role="group">
                    <button class="btn btn-success" :disabled="!newItemLabel" type="submit">Add</button>
                    <button class="btn btn-danger" type="reset" @click="isAddMode = false">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <div class="mt-2">
        <div v-if="items.length <= 0">No items to show!</div>

        <div v-else class="form-check" v-for="(item, idx) in itemsToShow">
            <input :id="'input-' + idx" class="form-check-input" type="checkbox" v-model="item.done" />
            <label class="form-check-label" :for="'input-' + idx">{{ item.label }}</label>
        </div>

        <div v-if="hideCompleted" class="text-muted">
            {{ completedCount }} completed item(s)
        </div>
    </div>
</template>
