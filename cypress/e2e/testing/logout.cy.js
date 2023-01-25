const TEST_USER = {
  email: "donkeys@stud.noroff.no",
  password: "Test1234",
};

describe("Log out", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerForm button").contains("Login").click();
    cy.get("input[name=email]#loginEmail").type(TEST_USER.email);
    cy.get("input[name=password]#loginPassword").type(TEST_USER.password);
    cy.get("button[type=submit").contains("Login").click();
    cy.wait(1000);
  });

  it("Can log out with the logout button", () => {
    cy.get("button").contains("Logout").click();
  });
});
