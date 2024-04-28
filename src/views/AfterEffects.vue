<template>
  <div class="homeTitleText" @click="navigateTo('/')">
    AfterEffects 插件备份
  </div>
  <div class="search">
    <div class="searchBox">
      <el-select
          v-model="plugIns"
          placeholder="筛选类型"
          style="width: 240px"
      >
        <el-option
            v-for="item in plugInFiles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="searchList">
      <el-table
          :data="files"
          style="width: 100%"
          border
      >
        <el-table-column
            label="文件名"
            prop="name"
        >
        </el-table-column>
        <el-table-column
            label="版本"
            prop="version"
        >
        </el-table-column>
        <el-table-column
            label="适用软件"
            prop="adobeNameID">
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template #default="{row}">
            <el-button @click="open(row)" type="info">查看</el-button>
            <el-button @click="backup(row)" type="primary">备份</el-button>
            <el-button @click="delFile(row)" type="danger">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
type ExtensionDescription = {name: string, version: string, adobeNameID: string[]}
const plugIns = ref('CEP')
const plugInFiles = [
  {
    value: 'CEP',
    label: '扩展'
  },
  {
    value: 'Plug-ins',
    label: '效果'
  },
  {
    value: 'Scripts',
    label: '脚本'
  },
  {
    value: 'ScriptsUI',
    label: 'UI脚本'
  }
]



const files = ref<ExtensionDescription[]>([]);
onMounted(async () => {
  const resultFile = await window.ipcRenderer.invoke("query", "123");
  resultFile.forEach((file: ExtensionDescription) => {
    files.value.push(file);
  });
})
const open = (file: string) => {
  window.ipcRenderer.invoke("open", file);
}
const backup = (file: string) => {
  ElMessage('备份功能尚未实现')
}
const delFile = (file: string) => {
  ElMessage('删除功能尚未实现')
}

const router = useRouter();

const navigateTo = (path:string) => {
  router.push(path);
};
</script>

<style scoped>

</style>