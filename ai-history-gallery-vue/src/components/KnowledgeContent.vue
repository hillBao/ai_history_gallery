<template>
  <div class="knowledge-content">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <div class="knowledge-entity" v-for="entity in entities" :key="entity.id">
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
</template>

<script setup>
import { defineProps, watch, ref, onMounted } from 'vue'
import { getCachedContent } from '@/api/content'

const props = defineProps({
  contentType: {
    type: String,
    default: 'ai-knowledge'
  },
  contentUrl: {
    type: String,
    default: ''
  }
})

const entities = ref([])
const loading = ref(false)
const error = ref('')

// 默认内容数据（作为fallback）
const defaultContent = {
  'ai-knowledge': [
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
  ],
  'blockchain-knowledge': [
    {
      id: 1,
      title: "区块链",
      type: "核心概念",
      definition: "区块链是一种分布式账本技术，通过密码学方法将交易记录按时间顺序链接成不可篡改的数据链。",
      details: [
        "每个区块包含多个交易记录和前一个区块的哈希值",
        "通过共识机制确保网络中所有节点数据一致",
        "具有去中心化、不可篡改、透明公开等特点",
        "是数字货币和Web3技术的重要基础"
      ],
      examples: [
        {
          name: "比特币",
          description: "第一个成功的区块链应用，点对点电子现金系统"
        },
        {
          name: "以太坊",
          description: "支持智能合约的区块链平台"
        },
        {
          name: "供应链追溯",
          description: "利用区块链技术追踪商品来源和流转过程"
        }
      ],
      keywords: ["分布式账本", "哈希", "共识机制", "去中心化", "智能合约"]
    }
  ]
}

// 加载内容
const loadContent = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (props.contentUrl) {
      // 优先从URL获取内容
      entities.value = await getCachedContent('', props.contentUrl)
    } else {
      // 尝试使用API获取内容，失败时使用默认内容
      try {
        entities.value = await getCachedContent(props.contentType)
      } catch (apiError) {
        console.warn('API获取失败，使用默认内容:', apiError)
        entities.value = defaultContent[props.contentType] || []
      }
    }
  } catch (err) {
    error.value = `加载内容失败: ${err.message}`
    console.error('Error loading content:', err)
    // 使用默认内容作为fallback
    entities.value = defaultContent[props.contentType] || []
  } finally {
    loading.value = false
  }
}

// 监听props变化
watch([() => props.contentType, () => props.contentUrl], () => {
  loadContent()
}, { immediate: true })

onMounted(() => {
  loadContent()
})
</script>

<style scoped>
.knowledge-content {
  /* 内容容器样式 */
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  padding: 20px;
  background: #fee;
  color: #c33;
  border-radius: 6px;
  border: 1px solid #fcc;
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

@media (max-width: 768px) {
  .example-grid {
    grid-template-columns: 1fr;
  }
}
</style> 