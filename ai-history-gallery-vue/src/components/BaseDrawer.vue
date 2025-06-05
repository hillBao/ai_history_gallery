<template>
  <div class="drawer-overlay" v-if="visible" @click="closeDrawer">
    <div class="drawer" @click.stop>
      <div class="drawer-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click="closeDrawer">×</button>
      </div>
      <div class="drawer-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, onUnmounted } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题'
  }
})

const emit = defineEmits(['close'])

const closeDrawer = () => {
  emit('close')
}

// 控制页面滚动的函数
const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden'
  // 保存当前滚动位置
  const scrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollY}px`
  document.body.style.width = '100%'
}

const enableBodyScroll = () => {
  const scrollY = document.body.style.top
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  // 恢复滚动位置
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
}

// 监听抽屉显示状态变化
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    disableBodyScroll()
  } else {
    enableBodyScroll()
  }
})

// 组件卸载时确保恢复滚动
onUnmounted(() => {
  enableBodyScroll()
})
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  /* 防止触摸滚动穿透 */
  touch-action: none;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
  /* 确保抽屉内可以正常滚动 */
  overscroll-behavior: contain;
  /* 硬件加速 */
  transform: translateZ(0);
  -webkit-overflow-scrolling: touch;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  position: sticky;
  top: 0;
  z-index: 10;
}

.drawer-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e9ecef;
  color: #333;
}

.drawer-content {
  padding: 20px;
  /* 确保内容区域可以正常滚动 */
  overflow-y: visible;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@media (max-width: 768px) {
  .drawer {
    width: 90%;
  }
  
  .drawer-header h2 {
    font-size: 1.3rem;
  }
}
</style> 