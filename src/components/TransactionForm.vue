<template>
  <div>
    <div class="transaction-form">
      <div v-show="image" class="transaction-form__image">
        <img crossorigin="Anonymous" :src="image" />
      </div>
      <Component :is="currentComponent" :bus="bus"/>
    </div>

    <div class="bottom-navigation filter-image__navigation">
        <h3 class="title--navigation" @click="moveTo('create-transaction-1')">Re-Upload</h3>
        <h3 class="title--navigation" @click="submitForm" >Save</h3>
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
}
</style>
