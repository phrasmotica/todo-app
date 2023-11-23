<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { TodoList } from "./types"

const props = defineProps<{
    list: TodoList
    completedCount: number
}>()

const emit = defineEmits<{
    setName: [name: string]
    setHideCompleted: [hideCompleted: boolean]
    deleteList: []
}>()

const listName = ref(props.list.name)
const hideCompleted = ref(props.list.settings.hideCompleted)
const showDeleteConfirmation = ref(false)

watch(props, () => {
    listName.value = props.list.name
    hideCompleted.value = props.list.settings.hideCompleted
})

const canSave = computed(() => hideCompleted.value !== props.list.settings.hideCompleted || (listName.value && listName.value !== props.list.name))

const saveSettings = () => {
    emit("setName", listName.value)
    emit("setHideCompleted", hideCompleted.value)
}

const confirmDeleteList = () => {
    showDeleteConfirmation.value = true
}

const deleteList = () => {
    emit("deleteList")
    showDeleteConfirmation.value = false
}

onMounted(() => {
    const modalElement = document.getElementById("settingsModal")

    // should do this on hidden.bs.modal, but that causes issues with
    // the current save button. We can address that later
    modalElement?.addEventListener("shown.bs.modal", () => {
        listName.value = props.list.name
    })

    modalElement?.addEventListener("hidden.bs.modal", () => {
        showDeleteConfirmation.value = false
    })
})
</script>

<template>
    <div id="settingsModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="saveSettings">
                    <div class="modal-header">
                        <h5 class="modal-title">Settings - {{ props.list.name }}</h5>
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
                                v-model="hideCompleted" />

                            <label class="form-check-label" for="input-hidecompleted">
                                Hide completed items ({{ props.completedCount }})
                            </label>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" :disabled="!canSave" data-bs-dismiss="modal">
                            Save
                        </button>

                        <button v-if="!showDeleteConfirmation" type="button" class="btn btn-danger" @click="confirmDeleteList">
                            Delete List
                        </button>
                        <button v-else type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteList">
                            Are you sure?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
