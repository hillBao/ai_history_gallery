<script setup>
import { milestones } from '../../data/milestones.js'
</script>

<template>
  <section id="milestones">
    <h2>详细里程碑</h2>
    <div class="cards">
      <div class="card" v-for="m in milestones" :key="m.year">
        <h3>{{ m.year }} - {{ m.title }}</h3>
        <p>{{ m.description }}</p>
        <a :href="m.link" target="_blank">了解更多</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.card {
  flex: 1 1 200px;
  border: 1px solid #e5e5e5;
  padding: 1rem;
  border-radius: 8px;
}
</style>
