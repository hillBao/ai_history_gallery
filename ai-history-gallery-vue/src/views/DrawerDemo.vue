<template>
  <div class="drawer-demo">
    <div class="demo-header">
      <h1>抽屉组件演示</h1>
      <p>展示如何使用新的可配置抽屉系统</p>
    </div>

    <div class="demo-section">
      <h2>基本用法</h2>
      <div class="demo-buttons">
        <button @click="showAIKnowledge" class="demo-btn primary">
          AI知识概念
        </button>
        <button @click="showBlockchainKnowledge" class="demo-btn primary">
          区块链知识概念
        </button>
        <button @click="showMLKnowledge" class="demo-btn primary">
          机器学习知识概念
        </button>
      </div>
    </div>

    <div class="demo-section">
      <h2>URL方式加载内容</h2>
      <div class="demo-buttons">
        <button @click="showContentFromUrl" class="demo-btn secondary">
          从URL加载区块链内容
        </button>
        <button @click="showContentFromCustomUrl" class="demo-btn secondary">
          从自定义URL加载内容
        </button>
      </div>
    </div>

    <div class="demo-section">
      <h2>URL参数控制</h2>
      <div class="demo-info">
        <p>通过URL参数控制抽屉内容，你可以尝试以下URL:</p>
        <div class="url-examples">
          <code>?content=ai-knowledge</code>
          <code>?content=blockchain-knowledge</code>
          <code>?content=blockchain-knowledge&url=/api/content/blockchain-knowledge.json</code>
        </div>
        <button @click="updateUrlParams" class="demo-btn tertiary">
          测试URL参数控制
        </button>
      </div>
    </div>

    <div class="demo-section">
      <h2>当前状态</h2>
      <div class="status-display">
        <div class="status-item">
          <label>抽屉状态:</label>
          <span :class="{ active: drawerVisible }">{{ drawerVisible ? '显示' : '隐藏' }}</span>
        </div>
        <div class="status-item">
          <label>内容类型:</label>
          <span>{{ currentContentType }}</span>
        </div>
        <div class="status-item">
          <label>内容URL:</label>
          <span>{{ currentContentUrl || '无' }}</span>
        </div>
      </div>
    </div>

    <!-- 知识抽屉组件 -->
    <KnowledgeDrawer 
      :visible="drawerVisible"
      :content-type="currentContentType"
      :content-url="currentContentUrl"
      @close="closeDrawer"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import KnowledgeDrawer from '@/components/KnowledgeDrawer.vue'

const router = useRouter()
const route = useRoute()

const drawerVisible = ref(false)
const currentContentType = ref('ai-knowledge')
const currentContentUrl = ref('')

// 显示AI知识
const showAIKnowledge = () => {
  currentContentType.value = 'ai-knowledge'
  currentContentUrl.value = ''
  drawerVisible.value = true
}

// 显示区块链知识
const showBlockchainKnowledge = () => {
  currentContentType.value = 'blockchain-knowledge'
  currentContentUrl.value = ''
  drawerVisible.value = true
}

// 显示机器学习知识
const showMLKnowledge = () => {
  currentContentType.value = 'ml-knowledge'
  currentContentUrl.value = ''
  drawerVisible.value = true
}

// 从URL加载内容
const showContentFromUrl = () => {
  currentContentType.value = ''
  currentContentUrl.value = '/api/content/blockchain-knowledge.json'
  drawerVisible.value = true
}

// 从自定义URL加载内容
const showContentFromCustomUrl = () => {
  const customUrl = prompt('请输入内容JSON文件的URL:', '/api/content/blockchain-knowledge.json')
  if (customUrl) {
    currentContentType.value = ''
    currentContentUrl.value = customUrl
    drawerVisible.value = true
  }
}

// 更新URL参数进行测试
const updateUrlParams = () => {
  router.push({
    query: {
      content: 'blockchain-knowledge',
      url: '/api/content/blockchain-knowledge.json'
    }
  })
  // 模拟从URL参数获取内容
  setTimeout(() => {
    currentContentType.value = 'blockchain-knowledge'
    currentContentUrl.value = '/api/content/blockchain-knowledge.json'
    drawerVisible.value = true
  }, 100)
}

// 关闭抽屉
const closeDrawer = () => {
  drawerVisible.value = false
}

// 监听路由参数变化
onMounted(() => {
  if (route.query.content) {
    currentContentType.value = route.query.content
    currentContentUrl.value = route.query.url || ''
    drawerVisible.value = true
  }
})
</script>

<style scoped>
.drawer-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.demo-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.demo-header p {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

.demo-section {
  margin-bottom: 40px;
  padding: 30px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.demo-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.demo-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.demo-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.demo-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.demo-btn.secondary {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
}

.demo-btn.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(252, 182, 159, 0.4);
}

.demo-btn.tertiary {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.demo-btn.tertiary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(168, 237, 234, 0.4);
}

.demo-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.demo-info p {
  margin: 0 0 15px 0;
  color: #333;
}

.url-examples {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 15px 0;
}

.url-examples code {
  background: #e9ecef;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  border: 1px solid #dee2e6;
}

.status-display {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.status-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.status-item:last-child {
  margin-bottom: 0;
}

.status-item label {
  font-weight: 600;
  margin-right: 10px;
  min-width: 100px;
  color: #495057;
}

.status-item span {
  color: #6c757d;
  font-family: monospace;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.status-item span.active {
  background: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

@media (max-width: 768px) {
  .drawer-demo {
    padding: 15px;
  }
  
  .demo-header {
    padding: 30px 20px;
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .demo-section {
    padding: 20px;
  }
  
  .demo-buttons {
    flex-direction: column;
  }
  
  .url-examples {
    gap: 10px;
  }
  
  .status-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .status-item label {
    margin-bottom: 5px;
  }
}
</style> 