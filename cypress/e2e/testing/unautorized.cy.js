const TEST_USER = {
  email: "rordon@stud.noroff.no",
  password: "Gurkemeie69",
};

describe("Unautorized user cannot log in", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(1000);
  });

  it("The user cannot submit the login form with invalid credentials and is shown a message.", () => {
    cy.get("#registerForm button").contains("Login").click();
    cy.wait(1000);
    cy.get("input[name=email]#loginEmail").type(
      "thiswillnotwork@stud.noroff.no"
    );
    cy.get("input[name=password]#loginPassword").type("PazZWoRdZ");
    cy.get("button[type=submit").contains("Login").click();
    cy.wait(1000);
  });
});
