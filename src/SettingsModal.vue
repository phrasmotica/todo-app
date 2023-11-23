<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { TodoList } from "./types"

const props = defineProps<{
    list: TodoList
    hideCompleted: boolean
    completedCount: number
}>()

const emit = defineEmits<{
    setName: [name: string]
    setHideCompleted: [hideCompleted: boolean]
}>()

const listName = ref(props.list.name)

watch(props, () => {
    listName.value = props.list.name
})

const saveSettings = () => {
    emit("setName", listName.value)
}

onMounted(() => {
    const modalElement = document.getElementById("settingsModal")

    // should do this on hidden.bs.modal, but that causes issues with
    // the current save button. We can address that later
    modalElement?.addEventListener("shown.bs.modal", () => {
        listName.value = props.list.name
    })
})
</script>

<template>
    <div id="settingsModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="saveSettings">
                    <div class="modal-header">
                        <h5 class="modal-title">Settings - {{ listName }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div>
                            <label class="form-label" for="input-editname">Name</label>
                            <input id="input-editname" class="form-control" ref="editNameInput" placeholder="List name" v-model="listName" />
                        </div>

                        <div class="form-check mt-2">
                            <input
                                id="input-hidecompleted"
                                class="form-check-input"
                                type="checkbox"
                                :value="props.hideCompleted"
                                @change="(e: any) => emit('setHideCompleted', e.target.checked)" />

                            <label class="form-check-label" for="input-hidecompleted">
                                Hide completed items ({{ props.completedCount }})
                            </label>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" :disabled="!listName" data-bs-dismiss="modal">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
