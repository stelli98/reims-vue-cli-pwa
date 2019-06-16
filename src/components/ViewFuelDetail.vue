<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>Fuel Type</h3>
      <p>{{ transaction.type }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Volume</h3>
      <p>{{ transaction.volume }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Unit Price</h3>
      <p>{{ transaction.unitPrice | priceFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Price</h3>
      <p>{{ totalPrice | priceFormatter }}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        transaction: Object
    },
    computed: {
        totalPrice () {
            return this.transaction.unitPrice * this.transaction.volume;
        }
    }

};
</script>

<style lang="scss" scoped>
</style>
