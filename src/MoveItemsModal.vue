<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCompletedCount, TodoList } from "./types"

const props = defineProps<{
    lists: TodoList[]
    items: string[]
}>()

const emit = defineEmits<{
    move: [destinationListId: string]
}>()

const lists = ref(props.lists)
const items = ref(props.items)

watch(props, () => {
    lists.value = props.lists
    items.value = props.items

    if (props.lists.length > 0) {
        destinationListId.value = props.lists[0].id
    }
})

const destinationListId = ref("")

const moveItems = () => {
    emit("move", destinationListId.value)

    destinationListId.value = ""
}
</script>

<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="moveItems">
                    <div class="modal-header">
                        <h5 class="modal-title">Move Items</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <p>Move {{ items.length }} item(s) where?</p>

                        <select class="form-select" v-model="destinationListId">
                            <option v-for="list in lists" :value="list.id">
                                {{ list.name }} ({{ getCompletedCount(list) }}/{{ list.items.length }})
                            </option>
                        </select>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" :disabled="!destinationListId" data-bs-dismiss="modal">
                            Move
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
