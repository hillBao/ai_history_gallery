<template>
  <header class="header">
    <button class="ai-title-btn" @click="openDrawer">
      <h1>AI History Gallery</h1>
      <span class="click-hint">点击了解人工智能概念</span>
    </button>
    <nav>
      <ul class="nav">
        <li>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'intro' }"
            @click="changeTab('intro')"
          >
            AI简介
          </button>
        </li>
        <li>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'timeline' }"
            @click="changeTab('timeline')"
          >
            时间轴
          </button>
        </li>
        <li>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'milestones' }"
            @click="changeTab('milestones')"
          >
            里程碑
          </button>
        </li>
        <li>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'people' }"
            @click="changeTab('people')"
          >
            人物机构
          </button>
        </li>
        <li>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'future' }"
            @click="changeTab('future')"
          >
            未来展望
          </button>
        </li>
        <li>
          <button 
            class="nav-btn" 
            :class="{ active: activeTab === 'references' }"
            @click="changeTab('references')"
          >
            参考资料
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'intro'
  }
})

const emit = defineEmits(['open-drawer', 'tab-change'])

const openDrawer = () => {
  emit('open-drawer')
}

const changeTab = (tab) => {
  emit('tab-change', tab)
}
</script>

<style scoped>
.header {
  text-align: center;
  padding: 1rem;
  background: #242424;
  color: #fff;
}

.ai-title-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 1rem;
}

.ai-title-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.ai-title-btn h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
}

.click-hint {
  display: block;
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 5px;
  opacity: 0.8;
}

.ai-title-btn:hover .click-hint {
  opacity: 1;
  color: #fff;
}

.nav {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.nav-btn {
  background: none;
  border: none;
  color: inherit;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  color: #00d4ff;
}

@media (max-width: 768px) {
  .ai-title-btn h1 {
    font-size: 1.5rem;
  }
  
  .click-hint {
    font-size: 0.8rem;
  }
  
  .nav {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .nav-btn {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}
</style>
