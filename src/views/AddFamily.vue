<template>
  <div class="add-family">
    <GlobalHeader/>
    <div class="add-family__content">
      <div class="heading add-family__heading">Add Family</div>
      <form class="user-form__form">
        <div class="add-family">
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Name</label>
            <input
              v-model="family.name"
              type="name"
              name="type"
              class="form__input"
              @blur="$v.family.name.$touch()"
            />
            <div v-if="$v.family.name.$error">
              <p v-if="!$v.family.name.required" class="input__error-message">Name must be filled</p>
            </div>

            <div v-if="$v.family.name.$error">
              <p
                v-if="!$v.family.name.minLength"
                class="input__error-message"
              >Name must have at least 3 characters</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="date">Date of Birth</label>
            <Datetime
              v-model="formatDate"
              type="date"
              class="form__input"
              :max-datetime="maxDateOfBirth"
              :min-datetime="minDateOfBirth"
              @close="$v.family.dateOfBirth.$touch()"
            />
            <div v-if="$v.family.dateOfBirth.$error">
              <p
                v-if="!$v.family.dateOfBirth.required"
                class="input__error-message"
              >Date must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Relationship</label>
            <select
              v-model="family.relationship"
              class="form__input form__input__select"
              @blur="$v.family.relationship.$touch()"
            >
              <option
                v-for="relationship in relationshipType"
                :key="relationship"
                :value="relationship"
                :selected="family.relationship"
              >{{ relationship | textFormatter }}</option>
            </select>
            <div v-if="$v.family.relationship.$error">
        <p v-if="!$v.family.relationship.required" class="input__error-message">
          Relationship must be filled
        </p>
      </div>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation add-family__navigation">
      <div class="title--navigation" @click="moveTo('user-detail')">Cancel</div>
      <div class="title--navigation" @click="submitAddFamilyToUserForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/add-family.js"></script>
<style lang="scss" scoped>
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.add-family {
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

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .active {
    color: $color-green;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: $color-green;
    font-weight: 400;
    margin: 1rem 0 0.5rem 0;
    &:hover {
      cursor: pointer;
    }
  }
  &__markdown {
    margin-bottom: 1rem;
  }

  &__line {
    margin-bottom: 1rem;
  }
}
</style>
