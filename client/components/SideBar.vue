<template>
  <ul class="sidenav app-sidenav" :class="{open:value}">
    <nuxt-link
      tag="li"
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="{name: link.url}"
      :exact="link.exact"
    ><a href="#" class="waves-effect waves-orange pointer">{{link.name}}</a>
    </nuxt-link>
  </ul>
</template>

<script>
export default {
  name: "SideBar",
  props:['value'],
  data(){
    return{
      links:[
        {name: 'Счет', url: 'index', exact: true},
        {name: 'История', url: 'history'},
        {name: 'Планировани', url: 'planning'},
        {name: 'Новая запись', url: 'record'},
        {name: 'Категории', url: 'categories'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
