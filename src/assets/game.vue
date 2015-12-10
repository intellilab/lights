<style>
.row::after {
  content: ' ';
  display: block;
  clear: both;
}
.item {
  display: block;
  float: left;
  width: 32px;
  height: 32px;
  border: 1px solid gray;
}
.item.on {
  background-color: orange;
}
</style>

<template>
  <div class="game">
    <div class="game-info"><span class="game-number">{{lightsOn}}</span> lights need to be switched off.</div>
    <div class="game-field">
      <div class="row" v-for="row in matrix">
        <span class="item" v-for="item in row" :class="{on:item.value}" @click="click(item)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Lights from './lights';

const lights = new Lights;

export default {
  data() {
    let matrix = [];
    for (let i = lights.height; i --;) {
      const row = [];
      matrix.unshift(row);
      for (let j = lights.width; j --;) {
        row.unshift(lights.cell(i, j));
      }
    }
    return {
      lightsOn: lights.lightsOn,
      matrix,
    };
  },
  methods: {
    click: function (item) {
      lights.turn(item.index);
      this.lightsOn = lights.lightsOn;
      if (!this.lightsOn) {
        alert('You got it!');
        lights.initialize();
      }
    },
  },
};
</script>
