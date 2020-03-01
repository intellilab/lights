<template>
  <div>
    <h1>Lights</h1>
    <p>
      <em v-text="remain"></em> lights need to be switched off.
    </p>
    <p class="text-success" v-if="!remain">You got it!</p>
    <div class="mt-2">
      <div v-for="(row, i) in matrix" :key="i">
        <span
          v-for="(item, j) in row"
          :key="j"
          class="item"
          :class="{ active: item.value }"
          @click="onClick(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Lights from '#/common/lights';

const lights = new Lights();

export default {
  data() {
    return {
      remain: lights.remain,
      matrix: lights.matrix(),
    };
  },
  methods: {
    onClick(item) {
      lights.turn(item.index);
      this.remain = lights.remain;
    },
  },
};
</script>

<style>
h1 {
  margin-bottom: 16px;
  font-size: 36px;
}

em {
  color: #3498db;
  font-style: normal;
}

p {
  margin-bottom: 16px;
}

.mt-2 {
  margin-top: 32px;
}

.row::after {
  content: '';
  display: block;
  clear: both;
}

.item {
  display: inline-block;
  vertical-align: top;
  width: 60px;
  height: 60px;
  border: 1px solid #7f8c8d;
  border-radius: 8px;
  background: #34495e;
  &.active {
    background: radial-gradient(#fff,#2ecc71);
  }
}
</style>
