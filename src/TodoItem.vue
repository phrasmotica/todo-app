<script setup lang="ts">
import { computed } from 'vue'

import { Item } from './data'
import { Mode } from './types'

const props = defineProps<{
    mode: Mode
    item: Item
    index: number
    total: number
}>()

const emit = defineEmits<{
    check: [checked: boolean]
    setLabel: [label: string]
    moveUp: []
    moveDown: []
    delete: []
}>()

const isEditMode = computed(() => props.mode === Mode.Edit)

const id = 'input-' + props.index
</script>

<template>
    <div class="todo-item ps-2 my-1" :class="props.item.done && !isEditMode && 'completed'">
        <div class="form-check d-flex align-items-center">
            <input
                :id="id"
                class="form-check-input mb-1 flex-shrink-0"
                type="checkbox"
                :disabled="isEditMode"
                v-model="props.item.done"
                @change="(e: any) => emit('check', e.target.checked)" />

            <label v-if="!isEditMode" class="form-control-plaintext ms-2" :for="id">
                {{ props.item.label }}
            </label>

            <input v-else-if="isEditMode"
                class="form-control ms-2"
                v-model="props.item.label"
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
