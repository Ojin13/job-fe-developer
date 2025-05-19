<template>
  <div class="home-page">
    <h1 class="home-page__title">
      Administrace
    </h1>
    <p class="home-page__description">
      Co chcte dělat?
    </p>
    <NuxtLink
      to="/customers"
      class="home-page__link"
    >
      Přejít na seznam zákazníků
    </NuxtLink>

    <p class="home-page__or">
      Nebo
    </p>
    <NuxtLink
      to="/customer-groups"
      class="home-page__link"
    >
      Přejít na seznam skupin zákazníků
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/sass/_variables.scss";

.home-page {
  text-align: center;
  padding: $xxl-spacing $standard-spacing;

  &__title {
    font-size: $large-font-size;
    margin-bottom: $standard-spacing;
    color: $text-primary;
  }

  &__description {
    font-size: $medium-font-size;
    color: $text-secondary;
    margin-bottom: $xl-spacing;
  }

  &__or {
    margin-top: $small-spacing;
    margin-bottom: $small-spacing;
    color: $text-secondary;
  }

  &__link {
    display: inline-block;
    background-color: $primary;
    color: $white;
    padding: 0.8rem 1.5rem;
    border-radius: $border-radius;
    text-decoration: none;
    font-weight: $font-weight-medium;
    transition: background-color $transition-speed;

    &:hover {
      background-color: $primary-hover;
    }
  }
}
</style>
