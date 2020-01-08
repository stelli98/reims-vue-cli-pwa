<template>
  <div>
    <GlobalHeader />
    <div class="transaction-detail__content" v-if="isLoading">
      <h3>{{ transactionCategory + " Expenses" }}</h3>
      <p>
        {{ transactionDate }}
      </p>
      <h1>
        <Center>{{ transaction.title }}</Center>
      </h1>
      <div v-if="isOCR">
        <img class="transaction-detail__ocr-image" :src="imageBase64" />
      </div>
      <div v-else>
        <carousel class="transaction-detail__carousel" :perPage="1">
          <slide
            v-for="(image, index) in transaction.attachment"
            :key="index"
            class="transaction-detail__slide"
          >
            <img
              :src="image"
              class="transaction-detail__image"
              style="width: 250px; max-width: 100%;"
            />
          </slide>
        </carousel>
      </div>
      <Component :is="activeComponent" :transaction="transaction" />
    </div>
  </div>
</template>

<script src="./js/transaction-detail.js"></script>
<style lang="scss" scoped>
.transaction-detail {
  &__ocr-image {
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

  &__image {
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 0 auto !important;
  }
}
</style>
