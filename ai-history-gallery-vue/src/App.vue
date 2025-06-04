<script setup>
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import AiIntro from './components/modules/AiIntro.vue'
import TimelineOverview from './components/modules/TimelineOverview.vue'
import Milestones from './components/modules/Milestones.vue'
import KeyFigures from './components/modules/KeyFigures.vue'
import FutureOutlook from './components/modules/FutureOutlook.vue'
import References from './components/modules/References.vue'
import FooterComp from './components/Footer.vue'
</script>

<template>
  <Header />
  <Banner />
  <main>
    <AiIntro />
    <TimelineOverview />
    <Milestones />
    <KeyFigures />
    <FutureOutlook />
    <References />
  </main>
  <FooterComp />
</template>

<style scoped>
main {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
