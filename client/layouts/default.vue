<template>
  <div class="app-main-layout">
        <nav-bar
          @click="isOpen = !isOpen"
        />
        <side-bar
          v-model="isOpen"
        />
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <nuxt/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <nuxt-link :to="{name:'record'}" class="btn-floating btn-large blue" >
        <i class="large material-icons">add</i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
export default {
  data() {
    return {
      isOpen: true
    }
  },
  components: {
    NavBar, SideBar
  }
}
</script>
