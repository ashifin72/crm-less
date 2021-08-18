import Vue from 'vue'
function messagePlugin() {
  /*global M*/
  Vue.prototype.$message = function (html) {
    M.toast({html})

    Vue.prototype.$error = function (html) {
      M.toast({html: `[Ошибка]: ${html} `})
    }
  }
}
Vue.use(messagePlugin)
