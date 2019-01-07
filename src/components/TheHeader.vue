<template>
  <header class="TheHeader">
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class TheHeader extends Vue {
  @Getter
  isAuthenticated!: boolean;

  @Action
  logout!: () => void;
}
</script>

<style scoped lang="scss">
</style>
