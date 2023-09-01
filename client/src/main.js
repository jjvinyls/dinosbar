// [IMPORT] //
import aos from "aos";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vue from "vue";
import VViewer from "v-viewer";
import VueRellax from "vue-rellax";
import "aos/dist/aos.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "tiny-slider/src/tiny-slider.scss";
import "viewerjs/dist/viewer.css";


// [IMPORT] Personal //
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "./assets/styles/bootstrap-override.scss";
import "./assets/styles/style.scss";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VViewer, {
	defaultOptions: {
	  // your default options here, for example:
	  button: true,
	  navbar: false,
	  title: false,
	  toolbar: false,
	  tooltip: true,
	  movable: true,
	  zoomable: true,
	  rotatable: true,
	  scalable: true,
	  transition: true,
	  fullscreen: true,
	  keyboard: true
	}
});
Vue.use(VueRellax);


Vue.config.productionTip = false;


new Vue({
	router,
	store,
	created() 
	{
		aos.init(); 
	},
	render: (h) => 
	{
		return h(App);
	}
}).$mount("#app");
