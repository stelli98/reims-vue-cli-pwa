<template>
  <router-link
    class="link"
    :to="{ name: 'transaction-detail', params: { id: transaction.id } }"
  >
    <div class="transaction__card">
      <div class="transaction__card__left">
        <svg class="icon icon-big">
          <use
            v-bind="{ 'xlink:href': 'icons.svg#icon-' + transaction.category }"
          />
        </svg>
      </div>
      <div class="transaction__card__center">
        <div class="title--small transaction__date">
          {{ transaction.date | dateFormatter }}
        </div>
        <div class="title--big transaction__title">
          {{ transaction.title }}
        </div>
        <div class="title--small transaction__price">
          {{ transaction.price | priceFormatter }}
        </div>
      </div>

      <div class="transaction__card__right">
        <svg class="icon icon-medium-green">
          <use xlink:href="icons.svg#icon-dustbin" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    transaction: Object
  }
};
</script>

<style lang="scss">
.transaction__card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  background-color: $color-grey;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;

  @include respond(tab) {
    margin: 2.5rem 0;
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2),
      0 1px 15px 0 rgba(0, 0, 0, 0.19);
  }
}

.transaction__card__left {
  background: $color-green-gradient;
}

.transaction__card__center {
  flex-grow: 1;
  margin-left: 1rem;
}

.transaction__card__right {
  padding: 2rem;
}

.link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
