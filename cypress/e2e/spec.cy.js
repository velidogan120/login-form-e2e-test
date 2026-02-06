describe("Login Form Validation", () => {
  beforeEach(() => {
    cy.visit("localhost:5173/");
  });

  it("Valid bilgilerle submit eder ve success sayfasına gider", () => {
    cy.get("[data-cy=email-input]").type("General_Leuschke@hotmail.com");
    cy.get("[data-cy=password-input]").type("2odFMqYXH2fQasK");
    cy.get("[data-cy=terms-checkbox]").check().should("be.checked");

    cy.get("[data-cy=submit-button]").should("not.be.disabled").click();

    cy.url().should("include", "/success");
  });

  it("Email yanlışsa 1 hata mesajı gösterir ve buton disabled olur", () => {
    cy.get("[data-cy=email-input]").type("yanlisemail");
    cy.get("[data-cy=password-input]").type("2odFMqYXH2fQasK");
    cy.get("[data-cy=terms-checkbox]").check().should("be.checked");

    cy.get("[data-cy=submit-button]").should("be.disabled");

    cy.contains("Please enter a valid email address").should("exist");
    cy.get(".text-danger").should("have.length", 1);
  });

  it("Email ve password yanlışsa 2 hata mesajı gösterir", () => {
    cy.get("[data-cy=email-input]").type("yanlisemail");
    cy.get("[data-cy=password-input]").type("123");
    cy.get("[data-cy=terms-checkbox]").check().should("be.checked");

    cy.get("[data-cy=submit-button]").should("be.disabled");

    cy.contains("Please enter a valid email address").should("exist");
    cy.contains("Şifre en az 8 karakter").should("exist");
    cy.get(".text-danger").should("have.length", 2);
  });

  it("Email ve password doğru ama terms işaretlenmezse buton disabled olur", () => {
    cy.get("[data-cy=email-input]").type("General_Leuschke@hotmail.com");
    cy.get("[data-cy=password-input]").type("2odFMqYXH2fQasK");

    cy.get("[data-cy=submit-button]").should("be.disabled");
    cy.contains("You must accept the terms").should("exist");
    cy.get(".text-danger").should("have.length", 1);
  });
});
