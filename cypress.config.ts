import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: "http://localhost:8000",
    setupNodeEvents() {
    },
    experimentalSessionAndOrigin: false,
  },
});
