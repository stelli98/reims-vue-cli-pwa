<template>
  <div>
    <div class="transaction-form">
      <div v-show="image" class="transaction-form__image">
        <img crossorigin="Anonymous" :src="image" />
      </div>

      <div class="transaction-form__menu">
        <div class="title--big" :class="{ active: !isSwitchOn }" @click="toggle">Fuel</div>
        <div class="title--big" :class="{ active: isSwitchOn }" @click="toggle">Parking</div>
      </div>

      <Component :is="currentComponent" :bus="bus"/>
    </div>

    <div class="bottom-navigation filter-image__navigation">
      <div class="bottom-navigation__left" @click="moveTo('create-transaction-1')">
        <svg class="icon icon-medium-green">
          <use xlink:href="icons.svg#icon-circular-clockwise" />
        </svg>
        <h3 class="title--navigation">Re-Upload</h3>
      </div>
      <div class="bottom-navigation__right"  @click="submitForm">
        <h3 class="title--navigation">Save</h3>
        <svg class="icon icon-medium-green">
          <use xlink:href="icons.svg#icon-save" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script src="./js/transaction-form.js"></script>

<style lang="scss">
.transaction-form {
  width: 60vw;
  margin: 0 auto;

  @include respond(large-phone) {
    width: 40vw;
  }

  & > div {
    margin: 2rem 0;
  }

  &__fuel,
  &__parking {
    margin: 2rem 0;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 80vw;

      @include respond(medium-phone) {
        width: 25rem;
      }
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.5rem 0;
    & > div {
      padding: 0.5rem 1rem;
      width: 8rem;
      text-align: center;
      border: solid 0.1rem $color-green;
    }
  }
}
.active {
  color: $color-white;
  background-color: $color-green;
}
</style>
