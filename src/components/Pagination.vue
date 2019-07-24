<template>
  <div
    v-show="paging.totalPages > 1"
    class="pagination"
  >
    <div
      class="first"
      @click="moveTo(1)"
    >
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-first" />
      </svg>
    </div>
    <div
      v-show="paging.pageNumber != 1"
      class="prev"
      @click="moveTo(paging.pageNumber - 1)"
    >
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-prev" />
      </svg>
    </div>
    <div class="pagination__go-to">
      <div class="pagination__caption">
        <input
          v-model="inputPage"
          class="pagination__input"
          type="number"
          name=""
          min="1"
          :max="paging.totalPages"
        />
        <h2 class="pagination__text">/ {{ paging.totalPages }}</h2>
      </div>
      <button
        class="pagination__button"
        @click="moveTo(parseInt(inputPage))"
      >
        Go
      </button>
    </div>
    <div
      v-show="paging.pageNumber != paging.totalPages"
      class="next"
      @click="moveTo(paging.pageNumber + 1)"
    >
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-next" />
      </svg>
    </div>
    <div
      class="last"
      @click="moveTo(paging.totalPages)"
    >
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-last" />
      </svg>
    </div>
  </div>
</template>

<script src="./js/pagination.js"></script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  & > div {
    text-align: center;
    padding: 0.5rem 0.8rem;
    border-radius: 0.2rem;
    align-items: center;
  }

  &__button {
    background-color: $color-green;
    color: #fff;
  }

  &__input {
    border-bottom: solid 1px #49a969;
    padding: 0.5rem;
    width: 3.25rem;
  }

  &__button {
    border: none;
    padding: 0.75rem;
    border-radius: 0.5rem;
  }

  &__go-to,
  &__caption {
    margin: 0 1rem;
    display: flex;
    justify-content: space-between;
  }

  &__text {
    align-self: center;
    color: $color-green;
  }
}
</style>
