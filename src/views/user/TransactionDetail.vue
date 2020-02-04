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
      <div class="transaction-detail__box" v-if="isOCR">
        <img
          class="transaction-detail__ocr-image"
          :src="imagePath(images[0])"
        />
      </div>
      <div v-else class="transaction-detail__box">
        <carousel class="transaction-detail__carousel" :perPage="1">
          <slide
            v-for="(image, index) in images"
            :key="index"
            class="transaction-detail__slide"
          >
            <img
              :src="imagePath(image)"
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

  &__box {
    margin: 1.5rem 0;
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

  &__image {
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 0 auto !important;
  }
}
</style>
