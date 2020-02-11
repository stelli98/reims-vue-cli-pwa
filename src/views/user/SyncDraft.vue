<template>
  <div class="sync-draft">
    <GlobalHeader />
    <div class="sync-draft__list">
      <div v-if="transactions.length > 0">
        <div class="heading sync-draft__heading">Transaction Draft List</div>
        <SyncDraftCard
          v-for="(transaction, index) in transactions"
          :key="index"
          :transaction="transaction"
        />
      </div>
      <div v-else>
        <center>
          <h3>No Data Available</h3>
        </center>
      </div>
    </div>
  </div>
</template>

<script src="./js/sync-draft.js"></script>

<style lang="scss" scoped>
.sync-draft {
  &__list {
    width: 80vw;
    margin: 2rem auto;
  }
}
</style>
