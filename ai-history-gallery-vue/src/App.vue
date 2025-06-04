<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import AiIntro from './components/modules/AiIntro.vue'
import TimelineOverview from './components/modules/TimelineOverview.vue'
import Milestones from './components/modules/Milestones.vue'
import KeyFigures from './components/modules/KeyFigures.vue'
import FutureOutlook from './components/modules/FutureOutlook.vue'
import References from './components/modules/References.vue'
import FooterComp from './components/Footer.vue'
import KnowledgeDrawer from './components/KnowledgeDrawer.vue'

// 抽屉状态管理
const isDrawerVisible = ref(false)

// Tab状态管理
const activeTab = ref('intro')

const openDrawer = () => {
  isDrawerVisible.value = true
}

const closeDrawer = () => {
  isDrawerVisible.value = false
}

// Tab切换处理
const handleTabChange = (tab) => {
  activeTab.value = tab
}

// 键盘事件处理 - ESC键关闭抽屉
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isDrawerVisible.value) {
    closeDrawer()
  }
}

// 添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

// 清理事件监听器并确保恢复滚动
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  // 确保页面滚动恢复正常
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
})
</script>

<template>
  <Header 
    @open-drawer="openDrawer" 
    @tab-change="handleTabChange"
    :active-tab="activeTab"
  />
  <Banner />
  <main>
    <!-- 根据activeTab显示对应的组件 -->
    <AiIntro v-if="activeTab === 'intro'" />
    <TimelineOverview v-if="activeTab === 'timeline'" />
    <Milestones v-if="activeTab === 'milestones'" />
    <KeyFigures v-if="activeTab === 'people'" />
    <FutureOutlook v-if="activeTab === 'future'" />
    <References v-if="activeTab === 'references'" />
  </main>
  <FooterComp />
  
  <!-- 知识抽屉 -->
  <KnowledgeDrawer 
    :visible="isDrawerVisible" 
    @close="closeDrawer" 
  />
</template>

<style scoped>
main {
  margin: 0 auto;
  min-height: 60vh; /* 确保主要内容区域有最小高度 */
}
</style>
