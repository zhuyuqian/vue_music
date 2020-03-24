import Vue from 'vue'
import App from '@/App.vue'
import components from '@/components/overall/index';
import router from '@/router'
import store from '@/store'
import ajax from '@/api';
import Vant from 'vant';
import {Lazyload} from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'
import 'vant/lib/index.css';
import '@/assets/less/common.less';

require('vue2-animate/dist/vue2-animate.min.css');

var FastClick = require('fastclick'); // 解决移动端点击300m的问题
FastClick.attach(document.body);

Vue.use(components); // 全局注册组件
Vue.use(Lazyload); // 图片懒加载
Vue.use(ajax); // 请求相关
Vue.use(Vant); // vant-ui
Vue.use(require('vue-wechat-title')); // 动态改变title
Vue.use(VueAwesomeSwiper); // swiper轮播


Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
