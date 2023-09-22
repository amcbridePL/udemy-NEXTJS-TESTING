import { defineConfig } from "cypress";
import { addReservation } from "./lib/features/reservations/queries";
import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";
// Task and Env vars go here, instead of /cypress/plugins/index.js
export default defineConfig({
    env: {
        login_url: '/login',
        products_url: '/products',
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            // NOTE: Cypress tasks must return null
            on("task", {
                "db:reset": () => resetDB().then(() => null),
                addBand: (newBand) => addBand(newBand).then(() => null),
                // addReservation: (newReservation) =>
                    // addReservation(newReservation).then(() => null),
            });
        },
    },


});
