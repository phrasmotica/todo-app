<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    addNewList: [name: string]
}>()

const listName = ref("")

const addNewList = () => {
    emit("addNewList", listName.value)

    listName.value = ""
}
</script>

<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="addNewList">
                    <div class="modal-header">
                        <h5 class="modal-title">New List</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <label class="form-label" for="input-name">Name</label>
                        <input id="input-name" class="form-control" v-model="listName" />
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
