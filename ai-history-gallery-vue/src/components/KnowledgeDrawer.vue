<template>
  <div class="drawer-overlay" v-if="visible" @click="closeDrawer">
    <div class="drawer" @click.stop>
      <div class="drawer-header">
        <h2>人工智能 - 知识概念</h2>
        <button class="close-btn" @click="closeDrawer">×</button>
      </div>
      <div class="drawer-content">
        <div class="knowledge-entity" v-for="entity in knowledgeEntities" :key="entity.id">
          <div class="entity-header">
            <h3>{{ entity.title }}</h3>
            <span class="entity-type">{{ entity.type }}</span>
          </div>
          <div class="entity-content">
            <p class="definition">{{ entity.definition }}</p>
            <div class="details" v-if="entity.details">
              <h4>详细说明：</h4>
              <ul>
                <li v-for="detail in entity.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
            <div class="examples" v-if="entity.examples">
              <h4>应用示例：</h4>
              <div class="example-grid">
                <div class="example-item" v-for="example in entity.examples" :key="example.name">
                  <strong>{{ example.name }}</strong>
                  <p>{{ example.description }}</p>
                </div>
              </div>
            </div>
            <div class="keywords" v-if="entity.keywords">
              <h4>关键词：</h4>
              <div class="keyword-tags">
                <span class="keyword-tag" v-for="keyword in entity.keywords" :key="keyword">{{ keyword }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
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

const knowledgeEntities = [
  {
    id: 1,
    title: "人工智能",
    type: "核心概念",
    definition: "人工智能(Artificial Intelligence, AI)是指由人制造出来的机器所表现出来的智能，能够模拟、延伸和扩展人的智能的理论、方法、技术及应用系统。",
    details: [
      "AI的目标是让机器能够胜任一些通常需要人类智能才能完成的复杂工作",
      "包括学习、推理、感知、理解、交流和在复杂环境中行动的能力",
      "AI系统能够自主地执行任务，适应新的情况，并从经验中学习",
      "现代AI主要基于机器学习、深度学习等技术实现"
    ],
    examples: [
      {
        name: "语音识别",
        description: "将人类语音转换为文本，如Siri、小爱同学"
      },
      {
        name: "图像识别",
        description: "识别和分析图像内容，如人脸识别、医学影像诊断"
      },
      {
        name: "自然语言处理",
        description: "理解和生成人类语言，如翻译软件、聊天机器人"
      },
      {
        name: "推荐系统",
        description: "根据用户偏好推荐内容，如购物推荐、视频推荐"
      }
    ],
    keywords: ["机器学习", "深度学习", "神经网络", "算法", "数据", "智能系统"]
  },
  {
    id: 2,
    title: "机器学习",
    type: "技术分支",
    definition: "机器学习是人工智能的一个分支，它使计算机系统能够通过经验自动改进性能，而无需明确编程。",
    details: [
      "通过算法分析数据，识别模式，并做出预测或决策",
      "主要包括监督学习、无监督学习和强化学习三种类型",
      "核心思想是让机器从数据中'学习'规律和模式",
      "是当前AI发展的主要驱动力"
    ],
    examples: [
      {
        name: "监督学习",
        description: "使用标记数据训练模型，如垃圾邮件分类"
      },
      {
        name: "无监督学习",
        description: "从未标记数据中发现隐藏模式，如客户分群"
      },
      {
        name: "强化学习",
        description: "通过试错学习最优策略，如AlphaGo围棋程序"
      }
    ],
    keywords: ["监督学习", "无监督学习", "强化学习", "特征工程", "模型训练", "预测"]
  },
  {
    id: 3,
    title: "深度学习",
    type: "技术分支",
    definition: "深度学习是机器学习的一个子集，使用人工神经网络来模拟人脑的工作方式，特别擅长处理大量数据。",
    details: [
      "基于多层神经网络结构，能够自动学习数据的复杂特征",
      "在图像识别、语音识别、自然语言处理等领域取得突破性进展",
      "需要大量的计算资源和数据来训练模型",
      "是当前AI领域最活跃和最成功的技术之一"
    ],
    examples: [
      {
        name: "卷积神经网络(CNN)",
        description: "主要用于图像处理和计算机视觉任务"
      },
      {
        name: "循环神经网络(RNN)",
        description: "处理序列数据，如文本和时间序列"
      },
      {
        name: "Transformer模型",
        description: "现代自然语言处理的基础，如GPT、BERT"
      }
    ],
    keywords: ["神经网络", "反向传播", "GPU计算", "大数据", "特征提取", "端到端学习"]
  }
]
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
  width: 600px;
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

.knowledge-entity {
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.entity-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entity-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.entity-type {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.entity-content {
  padding: 20px;
}

.definition {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c3e50;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.details h4,
.examples h4,
.keywords h4 {
  color: #495057;
  margin: 20px 0 10px 0;
  font-size: 1.1rem;
}

.details ul {
  padding-left: 20px;
}

.details li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #6c757d;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.example-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.example-item strong {
  color: #495057;
  display: block;
  margin-bottom: 8px;
}

.example-item p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.keyword-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
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
  
  .example-grid {
    grid-template-columns: 1fr;
  }
}
</style> 