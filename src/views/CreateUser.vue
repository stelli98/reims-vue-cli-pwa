<template>
  <div class="create-user">
    <div class="header create-user__header"></div>
    <div class="create-user__content">
      <div class="heading create-user__heading">Create User</div>
      <form class="user-form__form">
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Username</label>
          <input
            v-model="user.username"
            type="username"
            name="type"
            class="form__input"
            @blur="$v.user.username.$touch()"
          />
          <div v-if="$v.user.username.$error">
            <p
              v-if="!$v.user.username.required"
              class="input__error-message"
            >Username must be filled</p>
          </div>
          <div v-if="$v.user.username.$error">
            <p
              v-if="!$v.user.username.minLength"
              class="input__error-message"
            >Username must have at least 3 characters</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="date">Date of Birth</label>
          <Datetime
            v-model="formatDate"
            type="date"
            class="form__input"
            :max-datetime="currentDateTime"
            @close="$v.user.dateOfBirth.$touch()"
          />
          <div v-if="$v.user.dateOfBirth.$error">
            <p v-if="!$v.user.dateOfBirth.required" class="input__error-message">Date must be filled</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Gender</label>
          <select
            v-model="user.gender"
            class="form__input form__input__select"
            @blur="$v.user.gender.$touch()"
          >
            <option
              v-for="gender in genderType"
              :key="gender"
              :value="gender"
              :selected="user.gender"
            >{{ gender | textFormatter }}</option>
          </select>
          <div v-if="$v.user.gender.$error">
            <p v-if="!$v.user.gender.required" class="input__error-message">Gender must be filled</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="type">Division</label>
          <select
            v-model="user.division"
            class="form__input form__input__select"
            @blur="$v.user.division.$touch()"
          >
            <option
              v-for="division in divisionType"
              :key="division"
              :value="division"
              :selected="user.division"
            >{{ division | textFormatter }}</option>
          </select>

          <div v-if="$v.user.division.$error">
            <p
              v-if="!$v.user.division.required"
              class="input__error-message"
            >Division must be filled</p>
          </div>
        </div>
        <div class="form__child">
          Does the user have a vehicle ?
          <div class="form__radio">
            <span>
              <input
                type="radio"
                name="gender"
                value="yes"
                :checked="userHaveVehicle"
                v-model="userHaveVehicle"
              />
              Yes
            </span>
            <span>
              <input
                type="radio"
                name="gender"
                value="no"
                :checked="userHaveVehicle"
                v-model="userHaveVehicle"
              />
              No
            </span>
          </div>
        </div>
        <div v-if="isShowingVehicleField">
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Plate Number</label>
            <input
              v-model="vehicle.plateNumber"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.vehicle.plateNumber.$touch()"
            />
            <div v-if="$v.vehicle.plateNumber.$error">
              <p
                v-if="!$v.vehicle.plateNumber.required"
                class="input__error-message"
              >Plate Number must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Vehicle Type</label>
            <input
              v-model="vehicle.type"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.vehicle.type.$touch()"
            />
            <div v-if="$v.vehicle.type.$error">
              <p
                v-if="!$v.vehicle.type.required"
                class="input__error-message"
              >Vehicle Type must be filled</p>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation create-user__navigation">
      <div class="title--navigation" @click="moveTo('user')">Cancel</div>
      <div class="title--navigation" @click="validateUserForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/create-user.js"></script>

<style lang="scss" scoped>
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.create-user {
  &__content {
    width: 65vw;
    min-height: 78vh;
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

  .form__radio {
    display: flex;
    margin-top: 0.25rem;
    & > span {
      display: flex;
      align-items: center;
      width: 50%;
    }
    input[type="radio"] {
      margin-right: 0.25rem;
    }
  }
}
</style>
