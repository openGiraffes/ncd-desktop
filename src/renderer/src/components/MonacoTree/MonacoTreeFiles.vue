<template>
    <div
        @contextmenu="monaco_tree_handle_right_click_file"
        @click="monaco_tree_toggle"
        :class="'monaco-tree-row' + (hide ? ' hide ' : ' ') + theme"
    >
        <span :style="style"></span>
        <i
            v-if="folder"
            :class="'monaco-tree-arrow codicon codicon-chevron-down' + (open ? ' open' : '')"
        ></i>
        <img :src="'assets/vscode-icons/' + icon + '.svg'" class="monaco-tree-icon" />
        <div class="monaco-tree-name">{{ name }}</div>
    </div>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
import { extensions } from '../../utils/extension-icon'
import { files } from '../../utils/file-icon'
import { folders } from '../../utils/folder-icon'
import { MonacoTreeElement } from '../ngx-monaco-tree.type'
import {
    ContextMenuElementSeparator,
    ContextMenuElementText
} from '../monaco-tree-context-menu/monaco-tree-context-menu.type'
import { ContextMenuAction } from './monaco-tree-file.type'

function getAbsolutePosition(element) {
    const r = { x: element.offsetLeft, y: element.offsetTop }
    if (element.offsetParent) {
        const tmp = getAbsolutePosition(element.offsetParent)
        r.x += tmp.x
        r.y += tmp.y
    }
    return r
}

export default defineComponent({
    props: {
        name: {
            type: String,
            default: ''
        },
        content: {
            type: Array,
            default: undefined
        },
        depth: {
            type: Number,
            default: 0
        },
        theme: {
            type: String,
            default: 'vs-dark'
        },
        hide: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const open = ref(false)
        const position = ref([undefined, undefined])

        const contextMenu = [
            {
                type: 'element',
                name: 'New File',
                action: () => {
                    emit('contextMenuClick', ['new_file', props.name])
                    position.value = [-1000, -1000]
                }
            },
            {
                type: 'element',
                name: 'New Directory',
                action: () => {
                    emit('contextMenuClick', ['new_directory', props.name])
                    position.value = [-1000, -1000]
                }
            },
            { type: 'separator' },
            {
                type: 'element',
                name: 'Rename',
                action: () => {
                    emit('contextMenuClick', ['rename_file', props.name])
                    position.value = [-1000, -1000]
                }
            },
            {
                type: 'element',
                name: 'Delete',
                action: () => {
                    emit('contextMenuClick', ['delete_file', props.name])
                    position.value = [-1000, -1000]
                }
            }
        ]

        const handleRightClickFile = (event) => {
            event.preventDefault()
            const pos = getAbsolutePosition(event.target)
            position.value = [pos.x + event.offsetX, pos.y + event.offsetY]
        }

        const handleClickFile = (file) => {
            emit('clickFile', props.name + '/' + file)
        }

        const handleRightClick = (event) => {
            emit('contextMenuClick', [event[0], props.name + '/' + event[1]])
        }

        const clickOut = (event) => {
            if (!this.$refs.eRef.contains(event.target)) {
                position.value = [-1000, -1000]
            }
        }

        onMounted(() => {
            window.addEventListener('click', clickOut)
        })

        return {
            open,
            position,
            contextMenu,
            handleRightClickFile,
            handleClickFile,
            handleRightClick
        }
    }
})
</script>

<style scoped>
.monaco-tree-row {
    font-size: 14px;
    line-height: 24px;
    display: flex;
    gap: 6px;
    cursor: pointer;
    padding-left: 32px;
}

.monaco-tree-row .monaco-tree-icon {
    width: 16px;
    height: 22px;
}

.monaco-tree-row .monaco-tree-arrow {
    margin-left: -18px;
    width: 12px;
    height: 22px;
    line-height: 22px;
    position: relative;
    top: 2px;
    transform: rotate(-90deg);
    transition: all 0.5s;
}

.monaco-tree-row .monaco-tree-arrow.open {
    transform: rotate(0deg);
    left: -2px;
    top: 0px;
}

.monaco-tree-row.vs-dark:hover {
    background: #2a2d2e;
}

.monaco-tree-row.vs-dark.active {
    background: #3f3f46;
}

.monaco-tree-row.vs-light:hover {
    background: #e8e8e8;
}

.monaco-tree-row.vs-light.active {
    background: #e4e6f1;
}

.monaco-tree-row.hide {
    display: none;
}

.monaco-tree-row.root-2 .monaco-tree-icon {
    margin-left: 10px;
}
</style>
