<template>
  <div class="transaction-detail__list">
    <div class="transaction-detail__box">
      <h3>Patient Name</h3>
      <p>{{ transaction.patient.name | textFormatter }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Patient Birthdate</h3>
      <p>{{ transaction.patient.dateOfBirth}}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Age</h3>
      <p>{{ transaction.age }}</p>
    </div>
    <div class="transaction-detail__box">
      <h3>Total Amount</h3>
      <p>{{ transaction.amount | priceFormatter }}</p>
    </div>
  </div>
</template>

<script src="./js/view-medical-detail.js"></script>

