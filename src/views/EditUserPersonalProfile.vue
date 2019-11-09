<template>
  <div class="edit-personal-profile">
    <div class="header edit-personal-profile__header"></div>
    <div class="edit-personal-profile__content">
      <div class="heading">Edit Personal Profile</div>
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
          <label class="input__label title--medium-form" for="type">Role</label>
          <select
            v-model="user.role"
            class="form__input form__input__select"
            @blur="$v.user.role.$touch()"
          >
            <option
              v-for="role in roleType"
              :key="role"
              :value="role"
              :selected="user.role"
            >{{ role | textFormatter }}</option>
          </select>
          <div v-if="$v.user.role.$error">
            <p v-if="!$v.user.role.required" class="input__error-message">Role must be filled</p>
          </div>
        </div>
        <div class="form__child">
          <label class="input__label title--medium-form" for="date">Date of Birth</label>
          <Datetime
            v-model="formatDate"
            type="datetime"
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
            <label class="input__label title--medium-form" for="type">License</label>
            <input
              v-model="user.license"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.user.license.$touch()"
            />
            <div v-if="$v.user.license.$error">
              <p
                v-if="!$v.user.license.required"
                class="input__error-message"
              >License must be filled</p>
            </div>
          </div>
          <div class="form__child">
            <label class="input__label title--medium-form" for="type">Vehicle Type</label>
            <input
              v-model="user.vehicle"
              type="username"
              name="type"
              class="form__input"
              @blur="$v.user.vehicle.$touch()"
            />
            <div v-if="$v.user.vehicle.$error">
              <p
                v-if="!$v.user.vehicle.required"
                class="input__error-message"
              >Vehicle must be filled</p>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="bottom-navigation edit-personal-profile__navigation">
      <div class="title--navigation" @click="moveToPreviousPage">Cancel</div>
      <div class="title--navigation" @click="sendEditUserForm">Save</div>
    </div>
  </div>
</template>

<script src="./js/edit-user-personal-profile.js"></script>

<style lang="scss" scoped>
@import "../../node_modules/vue-datetime/dist/vue-datetime.css";
.edit-personal-profile {
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
