<template>
  <div v-show="paging.totalPages > 1" class="pagination">
    <div class="first" @click="changePageTo(1)">
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-first" />
      </svg>
    </div>
    <div
      v-show="paging.pageNumber != 1"
      class="prev"
      @click="changePageTo(paging.pageNumber - 1)"
    >
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-prev" />
      </svg>
    </div>
    <div class="pagination__go-to">
      <select
        v-model="currentPage"
        class="pagination__selection"
        onfocus="this.size=2;"
        onblur="this.size=1;"
        onchange="this.size=1; this.blur();"
        @click="changePageTo(currentPage)"
      >
        <option
          :selected="currentPage"
          :key="index"
          class="pagination__option"
          v-for="(n, index) in paging.totalPages"
          >{{ index + 1 }}</option
        >
      </select>
    </div>
    <div
      v-show="paging.pageNumber != paging.totalPages"
      class="next"
      @click="changePageTo(paging.pageNumber + 1)"
    >
      <svg class="icon-green">
        <use xlink:href="icons.svg#icon-arrow-next" />
      </svg>
    </div>
    <div class="last" @click="changePageTo(paging.totalPages)">
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
    display: flex;
    justify-content: space-between;
  }

  &__text {
    align-self: center;
    color: $color-green;
  }

  &__selection {
    padding: 0.5rem;
  }

  &__option {
    padding: 0.5rem;
  }
}
</style>
