import { createApp } from "vue";
import App from "./App";
import components from "@/components/UI";
import directives from "./directives/index";
import router from "@/router/route";
import store from "./store";

const app = createApp(App);
components.forEach((component) => app.component(component.name, component));
directives.forEach((directive) => app.directive(directive.name, directive));
app.use(store).use(router).mount("#app");
