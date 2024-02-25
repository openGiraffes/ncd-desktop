<template>
    <div class="ncd-monaco-editor">
        <vue-monaco-editor 
            v-model:value="code" 
            theme="vs" 
            :options="MONACO_EDITOR_OPTIONS"
            @mount="handleMount"
        ></vue-monaco-editor>
    </div>
</template>

<script lang="ts">
export default {
    name: 'DevPage'
}
</script>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'

const MONACO_EDITOR_OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
}

const code = ref('// Hello world')
const editorRef = shallowRef()
const handleMount = editor => (editorRef.value = editor)

function formatCode() {
    editorRef.value?.getAction('editor.action.formatDocument').run()
}
</script>

<style scoped>
.ncd-monaco-editor {
    /* height: 90vh; */
    height: 100%;
}
</style>
