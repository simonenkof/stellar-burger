describe('Конструктор бургера', () => {
  it('добавление булки в конструктор', () => {
    cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');

    const firstBunAddButton = cy.get(':nth-child(2) > :nth-child(1) > .common_button');
    firstBunAddButton.should('exist').click();

    const constructorBunText = cy.get(
      '.mJns_Jb07jLke7LQ6UAF.mb-4 > .constructor-element > .constructor-element__row > .constructor-element__text'
    );

    constructorBunText.contains('Краторная булка N-200i');
  });

  it('добавление начинки в конструктор', () => {
    cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');

    const firstMainAddButton = cy.get(':nth-child(4) > :nth-child(1) > .common_button');
    firstMainAddButton.should('exist').click();

    const constructorMainsText = cy.get('.constructor-element__text');
    constructorMainsText.contains('Биокотлета из марсианской Магнолии');
  });
});
