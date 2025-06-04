<script setup>
import { milestones } from '../../data/milestones.js'
</script>

<template>
  <section id="timeline">
    <h2>时间轴总览</h2>
    <ul class="timeline">
      <li v-for="m in milestones" :key="m.year">
        <strong>{{ m.year }}</strong> - {{ m.title }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  margin: 2rem 0;
}
.timeline {
  list-style: none;
  padding: 0;
}
.timeline li {
  margin: 0.5rem 0;
}
</style>
