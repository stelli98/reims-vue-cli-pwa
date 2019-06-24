<template>
  <router-link
    class="link"
    :to="{ name: 'user-edit', params: { id: user.id } }"
  >
    <div class="user__card">
      <div class="user__card__center">
        <div class="title--big user__username">
          {{ userName }}
        </div>
        <div class="title--small user__role">
          {{ user.role | textFormatter }}
        </div>
      </div>

      <div class="user__card__right">
        <svg class="icon icon-medium-green">
          <use xlink:href="icons.svg#icon-dustbin" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    user: Object
  },
  computed: {
    userName() {
      return this.$options.filters.trimTextFormatter(this.user.username, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  &__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: span 1;
    background-color: $color-grey;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    padding: 1rem 0;

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2),
        0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }

    &__center {
      flex-grow: 1;
      margin-left: 1rem;
    }

    &__right {
      padding: 0.5rem;
    }
  }
}
</style>
