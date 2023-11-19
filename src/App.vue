<script setup lang="ts">
import { ref, watch } from 'vue'

interface Item { label: string, done: boolean }

const items = ref([] as Item[])
const isAddMode = ref(false)
const newItemLabel = ref("")

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

    <button v-if="!isAddMode" @click="isAddMode = true">Add new item</button>

    <div v-else>
        <form @submit="addNewItem">
            <input ref="addInput" v-model="newItemLabel" />
            <button :disabled="!newItemLabel" type="submit">Add</button>
            <button type="reset" @click="isAddMode = false">Cancel</button>
        </form>
    </div>

    <div>
        <div v-if="items.length <= 0">No items!</div>

        <div v-else v-for="(item, idx) in items">
            <input :id="'input-' + idx" type="checkbox" v-model="item.done" />
            <label :for="'input-' + idx">{{ item.label }}</label>
        </div>
    </div>
</template>
