<template>
  <header class="header">
    <button class="ai-title-btn" @click="openDrawer">
      <h1>AI History Gallery</h1>
      <span class="click-hint">点击了解人工智能概念</span>
    </button>
    <nav>
      <ul class="nav">
        <li><a href="#intro">AI简介</a></li>
        <li><a href="#timeline">时间轴</a></li>
        <li><a href="#milestones">里程碑</a></li>
        <li><a href="#people">人物机构</a></li>
        <li><a href="#future">未来展望</a></li>
        <li><a href="#references">参考资料</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['open-drawer'])

const openDrawer = () => {
  emit('open-drawer')
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

.nav a {
  color: inherit;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav a:hover {
  background: rgba(255, 255, 255, 0.1);
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
  
  .nav a {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}
</style>
