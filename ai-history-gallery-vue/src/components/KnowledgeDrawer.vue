<template>
  <BaseDrawer 
    :visible="visible" 
    :title="drawerTitle" 
    @close="closeDrawer"
  >
    <KnowledgeContent 
      :content-type="contentType" 
      :content-url="contentUrl" 
    />
  </BaseDrawer>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import BaseDrawer from './BaseDrawer.vue'
import KnowledgeContent from './KnowledgeContent.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  contentType: {
    type: String,
    default: 'ai-knowledge'
  },
  contentUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

// 根据内容类型计算抽屉标题
const drawerTitle = computed(() => {
  const titles = {
    'ai-knowledge': '人工智能 - 知识概念',
    'blockchain-knowledge': '区块链 - 知识概念',
    'ml-knowledge': '机器学习 - 知识概念',
    'web3-knowledge': 'Web3 - 知识概念'
  }
  
  return titles[props.contentType] || '知识概念'
})

const closeDrawer = () => {
  emit('close')
}
</script>

<style scoped>
/* 由于使用了BaseDrawer和KnowledgeContent，这里不需要额外的样式 */
</style> 