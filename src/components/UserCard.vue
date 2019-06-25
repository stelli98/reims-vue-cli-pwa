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

      <div
        class="user__card__right"
        @click="removeUser(user.id)"
      >
        <svg class="icon icon-medium-green">
          <use xlink:href="icons.svg#icon-dustbin" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script src="./js/user-card.js"></script>

<style lang="scss" >
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
