import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand.ts';
import { generateRandomId } from '../../lib/features/reservations/utils';


it("displays correct heading when navigation to shows route", () => {
    cy.visit("/");
    // do NOT need to await a findBy in Cypress, it takes care of it for us
    cy.findByRole("button", { name: /shows/i }).click();   
    cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays the correct heading when navigating to the bands route", () => {
    cy.visit("/");
    cy.findByRole("button", { name: /bands/i }).click();
    cy.findByRole("heading", { name: /our illustrious performers/i }).should("exist");

});

// it("resets the db", () => {
//     cy.task("db:reset");
// });

it("displays correct band name for a band route that existed at build time", () => {
    cy.task("db:reset").visit("/bands/1");
    cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
});

it("displays correct error if a band route using an id that is not in the db", () => {
    cy.task("db:reset").visit("/bands/12345");
    cy.findByRole("heading", { name: /error: band not found/i }).should("exist");
});

it("displays name for band that was not present at build time", () => {
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);

    cy.task("db:reset").task("addBand", newBand)
    // setTimeout(() => {
    //     console.log("Delayed for 3 seconds.");
    //   }, "3000");
      
    // cy.visit(`/bands/${bandId}`);
    cy.wait(1000).visit(`/bands/${bandId}`);

    cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
});