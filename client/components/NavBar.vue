<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{date | date('datetime')}}</span>
        <p>{{$auth.user}}</p>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <nuxt-link :to="{name:'profile'}"
                         class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </nuxt-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text"
                 @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script>
/*global M*/
export default {
  name: "NavBar",
  data:()=>({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods:{
    logout(){
      this.$auth.logout()
      // this.$router.push('/login?message=logout')
      // window.location.reload()
    }
  },
  mounted() {
    this.interval = setInterval(()=>{
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy() {
    //чистим плагин при смене лояута
    clearInterval(this.interval)
    if(this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy()
    }
  }
}
</script>

<style scoped>

</style>
