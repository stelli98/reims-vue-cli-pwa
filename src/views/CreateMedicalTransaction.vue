<template>
  <div>
    <div class="create-medical-transaction">
      <div class="header create-medical-transaction__header">
        <div class="create-medical-transaction__close" @click="moveTo('home')">
          <svg class="icon icon-small">
            <use xlink:href="icons.svg#icon-back" />
          </svg>
        </div>
      </div>
      <div class="create-medical-transaction__content">
        <carousel class="create-medical-transaction__carousel" :perPage="1">
          <slide
            v-for="(image,index) in images"
            :key="index"
            class="create-medical-transaction__slide"
          >
            <img
              :src="image"
              class="create-medical-transaction__image"
              style="width: 300px; max-width: 100%;"
            />
          </slide>
        </carousel>
        <form class="create-medical-transaction__form">
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Title</label>
            <input
              v-model="medical.title"
              type="text"
              name="type"
              class="form__input"
              @blur="$v.medical.title.$touch()"
            />
            <div v-if="$v.medical.title.$error">
              <p v-if="!$v.medical.title.required" class="input__error-message">Title must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="date">Date</label>
            <Datetime
              v-model="formatDate"
              type="date"
              class="form__input"
              :max-datetime="currentDateTime"
              @close="$v.medical.date.$touch()"
            />
            <div v-if="$v.medical.date.$error">
              <p v-if="!$v.medical.date.required" class="input__error-message">Date must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Claimed For</label>
            <select
              v-model="medical.patient"
              class="form__input form__input__select"
              @blur="$v.medical.patient.$touch()"
            >
              <option
                v-for="medical in userFamily"
                :key="medical.id"
                :value="medical"
                :selected="medical.patient"
              >{{ formatfamilyNameAndRelationship(medical.name, medical.relationship) | textFormatter }}</option>
            </select>

            <div v-if="$v.medical.patient.$error">
              <p
                v-if="!$v.medical.patient.required"
                class="input__error-message"
              >Claimed for must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Amount</label>
            <div class="form__currency">
              <p class="form__currency__symbol">Rp.</p>
              <input v-model="medicalAmount" type="text" name="type" class="form__currency__input" />
            </div>
            <div v-if="$v.medical.amount.$error">
              <p
                v-if="!$v.medical.amount.required"
                class="input__error-message"
              >Amount must be filled</p>
            </div>
            <p
              v-if="!$v.medical.amount.currency && $v.medical.amount.required"
              class="input__error-message"
            >Amount must be only filled in IDR currency format</p>
            <p
              v-if="!$v.amountInt.minValue && $v.medical.amount.currency"
              class="input__error-message"
            >Amount must more than 100</p>
          </div>
        </form>
      </div>
    </div>
    <div class="bottom-navigation filter-image__navigation">
      <h3 class="title--navigation" @click="moveTo">Cancel</h3>
      <h3 class="title--navigation" @click="submitMedicalForm">Save</h3>
    </div>
  </div>
</template>

<script src="./js/create-medical-transaction.js"></script>

<style lang="scss">
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.create-medical-transaction {
  &__content {
    width: 65vw;
    margin: 0 auto;
    @include respond(large-phone) {
      width: 40vw;
    }

    & > div {
      margin: 2rem 0;
    }
  }

  &__image {
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 0 auto !important;
  }

  .VueCarousel-dot-container,
  .VueCarousel-dot,
  .VueCarousel-dot--active {
    margin: 0 !important;
  }
}
</style>

