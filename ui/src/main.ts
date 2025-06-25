import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { TooltipDirective, TooltipComponent } from "vue3-tooltip";
import "vue3-tooltip/tooltip.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive("tooltip", TooltipDirective);
app.component("tooltip", TooltipComponent);

app.mount("#app");
