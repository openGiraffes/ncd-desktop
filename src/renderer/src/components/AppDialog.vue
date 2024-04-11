<template>
    <el-dialog v-model="show_dialog" title="Shipping address">
        <el-form :model="form" label-width="auto"> 
            {{ app_data }}
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="ncd_store_apps_dialog = false">Cancel</el-button>
                <el-button type="primary" @click="ncd_store_apps_dialog = false"> Confirm </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ref, inject } from 'vue'
export default {
    name: 'AppDialog',
    data(){
        return {
            appInfo: ref({})
        }
    },
    created(){
        this.appInfo = inject('appinfo')
    },
    methods: {
        
    }
}
</script>

<script setup>
const show_dialog = ref(false)
const app_data = defineProps(['appdata'])
console.log(app_data)

defineExpose({
    show_dialog
})
</script>