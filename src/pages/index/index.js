import { scaleWidth } from '@gera2ld/rem';
import Vue from 'vue';
import App from './app.vue';
import './style.css';

scaleWidth({
  stdWidth: 350,
  maxWidth: 350,
});
const vm = new Vue({
  render: h => h(App),
})
.$mount();
document.body.append(vm.$el);
