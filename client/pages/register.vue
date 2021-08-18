<template>
  <form class='card auth-card' @submit.prevent='register'>
    <div class='card-content'>
      <span class='card-title'>Домашняя бухгалтерия</span>
      <div class='input-field'>
        <input
          id='email'
          type='text'
          v-model.trim='email'
          :class='{invalid: ($v.email.$dirty && !$v.email.required)||($v.email.$dirty && !$v.email.email)}'
        >
        <label for='email'>Email</label>
        <small v-if='$v.email.$dirty && !$v.email.required' class='helper-text invalid'>Заполните поле</small>
        <small v-if='$v.email.$dirty && !$v.email.email' class='helper-text invalid'>Введите корентный Email</small>
      </div>
      <div class='input-field'>
        <input
          id='password'
          type='password'
          v-model.trim='password'
          :class='{invalid: ($v.password.$dirty && !$v.password.required)||($v.password.$dirty && !$v.password.minLength)}'
        >
        <label for='password'>Пароль</label>
        <small v-if='$v.password.$dirty && !$v.password.required' class='helper-text invalid'>
          ВВедите пароль
        </small>
        <small v-if='$v.password.$dirty && !$v.password.minLength' class='helper-text invalid'>
          Минимальная длина пароля {{ $v.password.$params.minLength.min }} знаков. Сейчас {{ password.length }}
        </small>
      </div>
      <div class='input-field'>
        <input
          id='name'
          type='text'
          v-model.trim='name'
          :class='{invalid: $v.name.$dirty && !$v.name.required}'
        >
        <label for='name'>Имя</label>
        <small v-if='$v.name.$dirty && !$v.name.required' class='helper-text invalid'>
          Введите имя
        </small>
      </div>
      <p>
        <label>
          <input type='checkbox'
                 v-model='agree'
                 :class='{invalid:$v.agree.$dirty && agree == false}'
          />
          <span>С правилами согласен</span>
          <small v-if='$v.agree.$dirty && agree == false' class='helper-text invalid'>
            Нужно согласится с правилами
          </small>
        </label>
      </p>
    </div>
    <div class='card-action'>
      <div>
        <button
          class='btn waves-effect waves-light auth-submit'
          type='submit'
        >
          Зарегистрироваться
          <i class='material-icons right'>send</i>
        </button>
      </div>

      <p class='center'>
        Уже есть аккаунт?
        <nuxt-link :to="{name: 'login'}">Войти!</nuxt-link>
      </p>

    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  layout: 'empty',
  data: () => ({
    email: null,
    password: null,
    name: null,
    agree: false
  }),
  methods: {
    async register() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      this.$axios.post('/api/auth/register', formData)
        .then((response) => {
          console.log('++++++')
          if (typeof response.data.access_token !== 'undefined') {
            console.log(response.data.access_token)
            this.$auth.setUserToken(response.data.access_token, true)
            this.$router.push('/')
          }
        })
        .catch((response) => { // если нет выдаем ошибку в консоль
          console.log(response.error)
          return response
        })
    },
    logout(){
      this.$auth.logout()
      window.location.reload()
    },
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  }
}
</script>

<style scoped>

</style>
