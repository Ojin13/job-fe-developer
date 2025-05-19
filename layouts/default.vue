<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <div class="layout__container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
</script>

<style scoped>
.layout__main {
  padding: 25px;
}

.layout__container {
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
}
</style>
