<template>
  CEPInstall - 插件安装
  <router-link to="/">
    <el-button type="primary">返回</el-button>
  </router-link>
  <div class="search">
    <div class="searchBox">
      <el-select
          v-model="plugIns"
          placeholder="筛选类型"
          style="width: 240px"
          @change="fetchData"
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
        <el-table-column label="文件名" prop="name"></el-table-column>
        <el-table-column label="版本" prop="version"></el-table-column>
        <el-table-column label="适用软件" prop="adobeNameID"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showDetails(row)" type="info">查看</el-button>
            <el-button @click="downloadFile(row)" type="primary">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

// Json数据类型定义
type ExtensionDescription = {
  id: number;
  name: string;
  file_size: string;
  md5: string;
  version: string;
  adobeNameID: string[];
  file_url: string;
};

// 定义选择器默认值
const plugIns = ref("CEP");

// 选择器数据
const plugInFiles = [
  {value: "CEP", label: "扩展"},
  {value: "Plug-ins", label: "效果"},
  {value: "Scripts", label: "脚本"},
  {value: "ScriptsUI", label: "UI脚本"},
];

// 数据列表
const files = ref<ExtensionDescription[]>([]);

// 获取数据
const fetchData = async () => {
  // 当选择器选择为扩展时，获取数据
  if (plugIns.value === "CEP") {
    try {
      // 定义 API 请求
      const response = await fetch("https://cdn.jsdelivr.net/gh/Dongyifengs/CEP-Update@main/Install/FileInstall.json");
      const data = await response.json();
      const cepInstallList = data.CEPINSTALL;

      // 获取最新版本
      if (cepInstallList.length > 0) {
        const latestVersion = cepInstallList[0].versions.reduce((max, current) => (current.id > max.id ? current : max), cepInstallList[0].versions[0]);

        // 赋值给数据列表
        files.value = [
          {
            name: cepInstallList[0].name,
            version: latestVersion.version,
            adobeNameID: latestVersion.compatible_software,
            file_url: latestVersion.file_url,
            id:latestVersion.id,
            file_size: latestVersion.file_size,
            md5: latestVersion.md5,
          },
        ];
      }
    } catch (error) {
      // 报错
      ElMessage.error("获取数据失败");
    }
  }
};

// 显示详细信息
const showDetails = (row: ExtensionDescription) => {
  ElMessageBox.alert(
      `
        ID: ${row.id}<br>
        文件名: ${row.name}<br>
        版本: ${row.version}<br>
        文件大小：${row.file_size}<br>
        MD5: ${row.md5}<br>
        下载链接: ${row.file_url}<br>
        适用软件: ${row.adobeNameID.join(", ")}
`,
      "详细信息",

      {
        dangerouslyUseHTMLString: true,
      }
  );
};

// 点击下载事件
const downloadFile = (row: ExtensionDescription) => {
  // 这个注释的是点击的时候直接打开下载（直接打开自带的浏览器）
  // window.open(row.file_url, "_blank");
  ElMessage.info("当前功能正在研发")
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
