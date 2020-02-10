<template>
  <div class="sync-draft">
    <GlobalHeader />
    <div class="sync-draft__list">
      <SyncDraftCard
        v-for="(transaction,index) in transactions"
        :key="index"
        :transaction="transaction"
      />
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
