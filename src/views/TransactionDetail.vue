<template>
  <div>
    <div class="header transaction-detail__header">
      <div
        class="transaction-detail__close"
        @click="moveTo"
      >
        <svg class="icon icon-small">
          <use xlink:href="icons.svg#icon-back" />
        </svg>
      </div>
    </div>
    <div class="transaction-detail__content">
      <h3>{{ transactionCategory + " Expenses" }}</h3>
      <p>
        {{ transaction.date || transaction.in | dateFormatter }}
      </p>
      <h1>
        <Center>{{ transaction.title }}</Center>
      </h1>
      <img
        class="transaction-detail__image"
        :src="transaction.image"
      />
      <Component
        :is="activeComponent"
        :transaction="transaction"
      />
    </div>
  </div>
</template>

<script src="./js/transaction-detail.js"></script>

<style lang="scss">
.transaction-detail {
  &__image {
    margin: 1.2rem auto;
    display: flex;
    width: 25rem;
  }

  &__content {
    width: 80vw;
    margin: 2rem auto;

    @include respond(large-phone) {
      width: 60vw;
      margin: 2rem auto;
    }

    @include respond(medium-phone) {
      width: 40vw;
      margin: 2rem auto;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 10rem);
    justify-content: space-evenly;
    grid-row-gap: 1.2rem;
  }

  &__box {
    display: flex;
    flex-direction: column;
  }
}
</style>
