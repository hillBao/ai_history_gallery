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
import DrawerDemo from './components/DrawerDemo.vue'

// 抽屉状态管理
const isDrawerVisible = ref(false)

// Tab状态管理
const activeTab = ref('intro')

// 演示模式状态
const isDemoMode = ref(false)

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

// 切换演示模式
const toggleDemoMode = () => {
  isDemoMode.value = !isDemoMode.value
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
  <div v-if="!isDemoMode">
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
    
    <!-- 演示模式切换按钮 -->
    <div class="demo-toggle">
      <button @click="toggleDemoMode" class="demo-toggle-btn">
        🔧 抽屉演示模式
      </button>
    </div>
  </div>
  
  <!-- 演示模式 -->
  <div v-else>
    <div class="demo-header">
      <button @click="toggleDemoMode" class="back-btn">
        ← 返回主应用
      </button>
      <h1>抽屉系统演示</h1>
    </div>
    <DrawerDemo />
  </div>
</template>

<style scoped>
main {
  margin: 0 auto;
  min-height: 60vh; /* 确保主要内容区域有最小高度 */
}

.demo-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.demo-toggle-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.demo-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.demo-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  gap: 20px;
}

.back-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #5a6268;
}

.demo-header h1 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}
</style>
