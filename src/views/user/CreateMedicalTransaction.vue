<template>
  <div class="create-medical-transaction">
    <GlobalHeader />
    <div class="create-medical-transaction__content">
      <carousel class="create-medical-transaction__carousel" :perPage="1">
        <slide
          v-for="(image, index) in images"
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
          <label class="input__label title--medium-form" for="type"
            >Title</label
          >
          <input
            autocomplete="off"
            v-model="medical.title"
            type="text"
            name="type"
            class="form__input"
            @blur="$v.medical.title.$touch()"
          />
          <div v-if="$v.medical.title.$error">
            <p v-if="!$v.medical.title.required" class="input__error-message">
              Title must be filled
            </p>
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
            <p v-if="!$v.medical.date.required" class="input__error-message">
              Date must be filled
            </p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type"
            >Claimed For</label
          >
          <select
            v-model="medical.patient.id"
            class="form__input form__input__select"
          >
            <option :key="data.id" :value="data.id" v-for="data in familyData">
              {{
                formatfamilyNameAndRelationship(data.name, data.relationship)
                  | textFormatter
              }}
            </option>
          </select>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type"
            >Amount</label
          >
          <div class="form__currency">
            <p class="form__currency__symbol">Rp.</p>
            <input
              autocomplete="off"
              v-model="medicalAmount"
              type="text"
              name="type"
              class="form__currency__input"
            />
          </div>
          <div v-if="$v.medical.amount.$error">
            <p v-if="!$v.medical.amount.required" class="input__error-message">
              Amount must be filled
            </p>
          </div>
          <p
            v-if="!$v.medical.amount.currency && $v.medical.amount.required"
            class="input__error-message"
          >
            Amount must be only filled in IDR currency format
          </p>
          <p
            v-if="!$v.amountInt.minValue && $v.medical.amount.currency"
            class="input__error-message"
          >
            Amount must more than 100
          </p>
        </div>
      </form>
    </div>
    <div class="bottom-navigation create-medical-transaction__navigation">
      <h3 class="title--navigation" @click="moveToPreviousPage">Cancel</h3>
      <h3 class="title--navigation" @click="submitMedicalForm">Save</h3>
    </div>
  </div>
</template>

<script src="./js/create-medical-transaction.js"></script>

<style lang="scss">
@import "../../../node_modules/vue-datetime/dist/vue-datetime.css";
.create-medical-transaction {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    flex: 1;
    width: 70vw;
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

  &__navigation,
  &__navigation > div {
    position: sticky !important;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
