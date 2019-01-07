<template>
  <div id="app">
    <TheHeader/>
    <button v-if="!isAuthenticated" @click="login">Login</button>
    <TheRoutine v-else-if="currentUser"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/TheHeader.vue";
import TheRoutine from "@/components/TheRoutine.vue";
import { Getter } from "vuex-class";
import User from "@/models/user";

@Component({
  components: { TheHeader, TheRoutine }
})
export default class App extends Vue {
  @Getter
  isAuthenticated!: boolean;

  @Getter
  currentUser?: User;

  async created() {
    await this.$store.dispatch("loadSession");

    if (this.isAuthenticated) {
      await this.$store.dispatch("loadOrCreateUser");
    }
  }

  async login() {
    await this.$store.dispatch("login");

    if (this.isAuthenticated) {
      await this.$store.dispatch("loadOrCreateUser");
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
