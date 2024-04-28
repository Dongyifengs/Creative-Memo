<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="homeTitle">
          <span class="homeTitleText">请选择你需要备份的软件</span>
        </div>
      </el-header>
      <el-main>
        <div class="homeSoftwareImg">
            <div class="homeSoftwareImgPhotoshop" @click="navigateTo('/Photoshop')">
              <img src="/photoshop.svg" alt="Photoshop">
              <div class="homeSoftwareImgPhotoshopText">Photoshop</div>
            </div>
          <div class="homeSoftwareImgIllustrator" @click="navigateTo('/Illustrator')">
            <img src="/illustrator.svg" alt="Illustrator">
            <div class="homeSoftwareImgIllustratorText">Illustrator</div>
          </div>
          <div class="homeSoftwareImgPremierePro" @click="navigateTo('/PremierePro')">
            <img src="/premiere.svg" alt="Premiere Pro">
            <div class="homeSoftwareImgPremiereProText">Premiere Pro</div>
          </div>
          <div class="homeSoftwareImgAfterEffects" @click="navigateTo('/aftereffects')">
            <img src="/after-effects.svg" alt="After Effects">
            <div class="homeSoftwareImgAfterEffectsText">After Effects</div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';




const router = useRouter();
const navigateTo = (path:string) => {
  router.push(path);
};
</script>

<style scoped>
.homeTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.homeSoftwareImg {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin: 20px
}

.homeSoftwareImg img {
  width: 50px;
  height: 50px;
}
</style>