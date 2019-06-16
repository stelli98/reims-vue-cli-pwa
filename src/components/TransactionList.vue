<template>
  <div class="transaction">
    <div class="transaction__heading">
      Transaction List
    </div>
    <div class="transaction__actions">
      <div class="btn-green transaction__filter">
        <svg class="icon icon-small">
          <use xlink:href="@/assets/icons/icons.svg#icon-filter" />
        </svg>
        <span>Filter and Sort</span>
      </div>
      <div class="btn-green transaction__download">
        <svg class="icon icon-small">
          <use xlink:href="@/assets/icons/icons.svg#icon-download" />
        </svg>
        <span>Download Report</span>
      </div>
    </div>
    <div class="transaction__list">
      <TransactionCard
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </div>
</template>

<script>
import TransactionCard from '@/components/TransactionCard.vue';
export default {
    components: {
        TransactionCard
    },
    props: {
        transactions: Array,
    }
};
</script>

<style lang="scss" scoped>
.transaction {
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin: 1.5rem 5vw;

  @include respond(large-phone) {
    width: 70vw;
    margin: 1.8rem 15vw;
  }

  @include respond(large-phone) {
    width: 50vw;
    margin: 2rem 25vw;
  }
  &__heading {
    display: flex;
    font-size: 1.5rem;
    font-family: "Nunito-Bold";
    margin-bottom: 1rem;

    @include respond(tab) {
      font-size: 1.8rem;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>