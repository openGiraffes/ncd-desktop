<template>
    <MonacoTreeFile @context-menu-click="handleClickContextMenu" @click-file="handleClickFile" v-for="row in tree"
        :key="row.name" :name="row.name" :content="row.content" :depth="0" :hide="false"></MonacoTreeFile>
</template>

<script>
import { defineComponent, ref } from 'vue';
import MonacoTreeFile from './MonacoTree/MonacoTreeFile.vue';

export default defineComponent({
    name: 'MonacoTreeComp',
    components: {
        MonacoTreeFile,
    },
    props: {
        theme: {
            type: String,
            default: 'vs-dark'
        },
        tree: {
            type: Array,
            default: () => []
        },
        width: {
            type: String,
            default: '300px'
        },
        height: {
            type: String,
            default: '500px'
        }
    },
    setup(props, { emit }) {
        const handleClickFile = (path) => {
            emit('click-file', path);
        }

        const handleClickContextMenu = (event) => {
            emit('click-context-menu', event);
        }

        return {
            handleClickFile,
            handleClickContextMenu
        };
    }
});
</script>

<style scoped>
.monaco-tree {
    font-family: -apple-system, BlinkMacSystemFont, Segoe WPC, Segoe UI, HelveticaNeue-dark, Ubuntu, Droid Sans, sans-serif;
    width: 300px;
}

.monaco-tree.vs-dark {
    background: #1d1d1d;
    color: white;
}

.monaco-tree.vs-light {
    background: #f3f3f3;
    color: #616161;
}
</style>