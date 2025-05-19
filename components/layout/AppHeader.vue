<template>
  <header class="app-header">
    <div class="app-header__container">
      <h1 class="app-header__title">
        Simplo
      </h1>
      <nav class="app-header__nav">
        <NuxtLink
          to="/"
          class="app-header__link"
        >Dashboard</NuxtLink>
        <NuxtLink
          to="/customers"
          class="app-header__link"
        >Zákazníci</NuxtLink>
        <NuxtLink
          to="/customer-groups"
          class="app-header__link"
        >Skupiny</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.app-header {
  background-color: $header-bg;
  color: $white;
  padding: $standard-spacing 0;

  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: $container-padding;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: $header-font-size;
    margin: 0;
  }

  &__nav {
    display: flex;
    gap: $standard-spacing;
  }

  &__link {
    color: $white;
    text-decoration: none;
    padding: $small-spacing;
    border-radius: $border-radius;
    transition: background-color $transition-speed;

    &:hover,
    &.router-link-active {
      background-color: $header-link-hover-bg;
    }
  }
}
</style>
