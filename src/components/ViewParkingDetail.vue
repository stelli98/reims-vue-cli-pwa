<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>In</h3>
      <p>{{ transaction.in | dateFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Out</h3>
      <p>{{ transaction.out | dateFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Vehicle Type</h3>
      <p>{{ transaction.vehicle }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>License</h3>
      <p>{{ transaction.license }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Location</h3>
      <p>{{ transaction.location }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Price</h3>
      <p>{{ transaction.price | priceFormatter }}</p>
    </div>
  </div>
</template>

<script src="./js/view-parking-detail.js"></script>

<style lang="scss" ></style>
