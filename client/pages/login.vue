<template>
  <div class="Login">
    <form @submit.prevent="onSubmit" class="card auth-card">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required)||($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">Заполните поле</small>
          <small v-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">Введите корентный Email</small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required)||($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Пароль</label>
          <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid">
            ВВедите пароль
          </small>
          <small v-if="$v.password.$dirty && !$v.password.minLength" class="helper-text invalid">
            Минимальная длина пароля {{$v.password.$params.minLength.min}} знаков. Сейчас {{password.length}}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <nuxt-link
            :to="{name: 'register'}"
          >Зарегистрироваться</nuxt-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from "../plugins/messages"
export default {
  name: 'login',
  layout: 'empty',
  data: () => ({
    email: null,
    password: null
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      let formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
      await this.$auth.loginWith('laravelJWT', {
        data: formData
      }).then(()=>{
        // window.location.reload()
      })
      // this.$router.push('/')
    }
  },
  mounted() {
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }

  }
}
</script>

<style scoped>

</style>
