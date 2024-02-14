<template>
    <div class="ncd-monaco-editor">
        <MonacoEditor
            theme="vs"
            :options="options"
            language="javascript"
            :original="original"
        ></MonacoEditor>
    </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue3'

export default {
    name: 'DevPage',
    components: {
        MonacoEditor
    },
    data() {
        return {
            options: {},
            original: ''
        }
    },
    mounted() {},
    methods: {
        getFileContent(filePath) {
            return [`${filePath}-left`, `${filePath}-right`]
        }
    }
}
</script>
<style scoped>
.ncd-monaco-editor {
    height: 90vh;
}
</style>
