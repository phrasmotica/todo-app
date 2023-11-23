<script setup lang="ts">
import { computed } from 'vue'

import { Item, Mode } from './types'

const props = defineProps<{
    mode: Mode
    item: Item
    selected: boolean
    index: number
    total: number
}>()

const emit = defineEmits<{
    check: [checked: boolean]
    select: [selected: boolean]
    setLabel: [label: string]
    moveUp: []
    moveDown: []
    delete: []
}>()

const isEditMode = computed(() => props.mode === Mode.Edit)

const id = 'input-check-' + props.item.id
const selectId = 'input-select-' + props.item.id
</script>

<template>
    <div class="todo-item ps-2 my-1" :class="!isEditMode && props.item.priority">
        <div class="form-check d-flex align-items-center">
            <input v-if="!isEditMode" :id="id" class="form-check-input mb-1 flex-shrink-0" type="checkbox"
                v-model="props.item.done" @change="(e: any) => emit('check', e.target.checked)" />
            <input v-else :id="selectId" class="form-check-input mb-1 flex-shrink-0" type="checkbox"
                v-model="props.selected" @change="(e: any) => emit('select', e.target.checked)" />

            <label v-if="!isEditMode"
                :for="id"
                class="form-control-plaintext ms-2">
                {{ props.item.label }}
            </label>

            <input v-else-if="isEditMode" class="form-control ms-2" v-model="props.item.label"
                @change="(e: any) => emit('setLabel', e.target.value)" />

            <div v-if="isEditMode" class="btn-group ms-2" role="group">
                <button class="btn btn-warning" :disabled="props.index <= 0" @click="emit('moveUp')">
                    <i class="bi bi-arrow-up"></i>
                </button>

                <button class="btn btn-warning" :disabled="props.index >= total - 1" @click="emit('moveDown')">
                    <i class="bi bi-arrow-down"></i>
                </button>
            </div>

            <div v-if="isEditMode" class="ms-2">
                <button class="btn btn-danger" @click="emit('delete')">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="css">
.todo-item {
    border-radius: 0.5em;
}

.todo-item.high {
    background-color: rgb(255, 147, 147, 0.8);
}

.todo-item.medium {
    background-color: rgb(255, 244, 147, 0.8);
}

.todo-item.low {
    background-color: rgb(147, 255, 147, 0.8);
}
</style>
