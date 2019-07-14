<template>
  <div class="user__card">
    <div
      class="user__card__center"
      @click="moveTo(user.id)"
    >
      <div class="
      title--big
      user__username">
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
      <svg
        class="icon icon-medium-green"
        id="delete"
      >
        <use xlink:href="icons.svg#icon-dustbin" />
      </svg>
    </div>
  </div>
</template>

<script src="./js/user-card.js"></script>

<style lang="scss">
.user {
  &__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: span 1;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    padding: 1rem 0;

    &__center {
      flex-grow: 1;
      margin-left: 1rem;
    }

    &__right {
      padding: 0.5rem;

      &:hover {
        #delete {
          fill: $color-red;
        }
      }
    }
  }
}
</style>
