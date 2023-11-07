<template>
    <div class="ncd-monaco-editor">
        <monaco-with-tree :files="files" :default-open-files="defaultOpenFiles" :get-file-content="getFileContent" />
    </div>
</template>

<script>
import MonacoWithTree from '../modules/MonacoWithTree.vue';
export default {
    name: "Dev",
    components: {
        MonacoWithTree
    },
    data() {
        return {
            files: ['package.json', 'README.md', 'index.js', 'src/test.js', 'src/index.js', 'public/index.html'],
            defaultOpenFiles: ['package.json'],
        }
    },
    methods: {
        getFileContent(filePath) {
            return [`${filePath}-left`, `${filePath}-right`];
        },
    },
};
</script>
<style scoped>
.ncd-monaco-editor {
    height: 90vh;
}
</style>