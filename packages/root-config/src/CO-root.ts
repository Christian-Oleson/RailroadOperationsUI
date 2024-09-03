import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });


registerApplication({
  name: `@CO/railroad-ops`,
  // @ts-ignore
  app: () => System.import(`@CO/railroad-ops`),
  activeWhen: [`/`],
});

applications.forEach(registerApplication);
layoutEngine.activate();
start();
