<template>
  <div class="sync-draft__card">
    <div class="sync-draft__card__left">
      <svg class="icon icon-big">
        <use
          v-bind="{
            'xlink:href': `icons.svg#icon-${transactionCategory(transaction.category)}`
          }"
        ></use>
      </svg>
    </div>
    <div class="sync-draft__card__center">
      <div class="title--small sync-draft__date">
        {{ transaction.date | dateFormatter }}
      </div>
      <div class="title--big sync-draft__title">
        {{ transaction.title | textFormatter }}
      </div>
      <div class="title--small sync-draft__price">
        {{ transaction.amount | priceFormatter }}
      </div>
    </div>
  </div>
</template>

<script src="./js/sync-draft-card.js"></script>

<style lang="scss" scoped>
.sync-draft__card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background-color: $color-grey;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;

  @include respond(tab) {
    margin: 2.5rem 0;
  }

  &__left {
    background: $color-green-gradient;
  }

  &__center {
    flex-grow: 1;
    margin-left: 1rem;
  }
}
</style>
