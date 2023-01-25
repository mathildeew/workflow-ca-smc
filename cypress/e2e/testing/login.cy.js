const TEST_USER = {
  email: "donkeys@stud.noroff.no",
  password: "Test1234",
};

describe("Log in", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(1000);
  });

  it("Can log in with the login form with valid credentials", () => {
    cy.get("#registerForm button").contains("Login").click();
    cy.wait(1000);
    cy.get("input[name=email]#loginEmail").type(TEST_USER.email);
    cy.get("input[name=password]#loginPassword").type(TEST_USER.password);
    cy.get("button[type=submit").contains("Login").click();
    cy.wait(1000);
  });

  it("The user cannot submit the login form with invalid credentials and is shown a message.", () => {
    cy.get("#registerForm button").contains("Login").click();
    cy.get("input[name=email]#loginEmail").type(
      "thiswillnotwork@stud.noroff.no"
    );
    cy.get("input[name=password]#loginPassword").type("PazZWoRdZ");
    cy.get("button[type=submit").contains("Login").click();
  });
});
