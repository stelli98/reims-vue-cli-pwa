<template>
  <div class="download-popup">
    <div class="download-popup__body">
      <div class="form__child">
        <label class="input__label title--medium-form" for="type">
          Type
        </label>
        <select v-model="selectedTransactionType">
          <option v-for="(type, index) in transactionType" :key="index">{{
            type
          }}</option>
        </select>
      </div>
      <div class="form__child">
        <label class="input__label title--medium-form" for="type">
          Month
        </label>
        <select v-model="selectedMonth">
          <option
            v-for="(month, index) in months"
            :key="index"
            :value="month"
            :selected="selectedMonth"
            >{{ month }}</option
          >
        </select>
      </div>
      <div class="form__child">
        <label class="input__label title--medium-form" for="type">
          Year
        </label>
        <select v-model="selectedYear">
          <option v-for="(year, index) in years" :key="index">{{
            year
          }}</option>
        </select>
      </div>
    </div>
    <hr />
    <div class="download-popup__navigation">
      <h3 class="title--navigation" @click="$emit('onClose')">Cancel</h3>
      <h3 class="title--navigation" @click="downloadReport">Download</h3>
    </div>
  </div>
</template>

<script src="./js/download-pop-up.js"></script>
<style lang="scss" scoped>
.download-popup {
  &__body {
    padding-top: 1.25rem;
    padding-left: 1.25rem;
  }

  &__navigation {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  &__navigation {
    display: flex;
    justify-content: space-evenly;
    color: $color-green;
  }

  input {
    border-bottom: $color-black solid 0.1rem;
  }
}
</style>

