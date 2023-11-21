<script setup lang="ts">
const props = defineProps<{
    hideCompleted: boolean
    completedCount: number
}>()

const emit = defineEmits<{
    setHideCompleted: [hideCompleted: boolean]
}>()
</script>

<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Settings</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
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
            </div>
        </div>
    </div>
</template>
