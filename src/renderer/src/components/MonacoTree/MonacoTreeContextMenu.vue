<template>
    <div v-if="left && top"
        :class="'monaco-tree-context-menu ' + theme" :style="'top:' + top + 'px; left: ' + left + 'px'"
    >
        <ul>
            <li v-for="element in elements"
                :class="element.type === 'element' ? 'monaco-tree-element' : 'monaco-tree-separator'"
                @click="element.type === 'element' ? element.action() : null">
                <a v-if="element.type === 'element'">{{ element.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "monaco-tree-file-context",
    data() {
        return {
            top: undefined,
            left: undefined,
            theme: 'vs-dark',
            elements: []
        }
    },
    mounted() {
        document.addEventListener('click', this.monaco_tree_handle_click_outside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.monaco_tree_handle_click_outside);
    },
    methods: {
        monaco_tree_handle_click_outside(event) {
            if (!this.$el.contains(event.target)) {
                this.top = -1000;
                this.left = -1000;
            }
        }
    }
}
</script>
<style scoped>
.monaco-tree-context-menu {
    position: absolute;
    font-family: Roboto, sans-serif;
    font-size: 0.8em;
    font-weight: 200;
    border-radius: 5px;
}

.monaco-tree-context-menu.vs-dark {
    background: #1d1d1d;
    color: white;
    border: 1px solid #313131;
}

.monaco-tree-context-menu.vs-dark ul li.monaco-tree-separator {
    background: #f0f0f0;
}

.monaco-tree-context-menu.vs-light {
    background: #f3f3f3;
    color: #616161;
    border: 1px solid #ccc;
}

.monaco-tree-context-menu.vs-light ul li.monaco-tree-separator {
    background: #424242;
}

.monaco-tree-context-menu ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    min-width: 150px;
}

.monaco-tree-context-menu ul li {
    display: flex;
    align-items: center;
    height: 2em;
    margin: 10px 0;
}

.monaco-tree-context-menu ul li.monaco-tree-element {
    padding: 0 12px;
    cursor: pointer;
}

.monaco-tree-context-menu ul li.monaco-tree-element:hover {
    background: #094785;
    color: white;
}

.monaco-tree-context-menu ul li.monaco-tree-separator {
    width: 80%;
    margin: 10px auto;
    height: 1px;
}
</style>