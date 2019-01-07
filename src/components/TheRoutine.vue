<template>
  <main class="TheRoutine">
    <nav>
      <div>
        Benchpress
        <input
          type="number"
          class="LiftValue"
          contenteditable
          v-model.number="lifts.benchPress"
          @blur="updateLift($event, 'benchPress')"
        >
      </div>
      <div>
        Deadlift
        <input
          type="number"
          class="LiftValue"
          contenteditable
          v-model.number="lifts.deadlift"
          @blur="updateLift($event, 'deadlift')"
        >
      </div>
      <div>
        Squat
        <input
          type="number"
          class="LiftValue"
          contenteditable
          v-model.number="lifts.squat"
          @blur="updateLift($event, 'squat')"
        >
      </div>
      <div>
        Shoulder Press
        <input
          type="number"
          class="LiftValue"
          v-model.number="lifts.shoulderPress"
          @blur="updateLift($event, 'shoulderPress')"
        >
      </div>
    </nav>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Lifts from "@/models/Lifts";

@Component
export default class TheHeader extends Vue {
  @Getter("lifts")
  getterLifts!: Lifts;

  lifts = new Lifts();

  created() {
    Object.assign(this.lifts, this.getterLifts);
  }

  updateLift<K extends keyof Lifts>(ev: Event, lift: K) {
    if (!(lift in this.lifts)) {
      return;
    }

    const prevValue = this.getterLifts[lift];
    const newValue = this.lifts[lift];

    if (prevValue !== newValue) {
      this.$store.dispatch("updateOneRepMax", { lift, value: newValue });
    }
  }
}
</script>

<style scoped lang="scss">
.LiftValue {
  font-size: 2rem;
}
</style>
