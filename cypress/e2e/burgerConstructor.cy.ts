describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `https://norma.nomoreparties.space/api/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
  });

  it('добавление булки в конструктор', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .common_button').click();

    const constructorBunText = cy.get(
      '.mJns_Jb07jLke7LQ6UAF.mb-4 > .constructor-element > .constructor-element__row > .constructor-element__text'
    );

    constructorBunText.contains('Краторная булка N-200i');
  });

  it('добавление начинки в конструктор', () => {
    cy.get(':nth-child(4) > :nth-child(1) > .common_button').click();

    const constructorMainsText = cy.get('.constructor-element__text');
    constructorMainsText.contains('Биокотлета из марсианской Магнолии');
  });

  it('открытие модального окна с информацией об ингредиенте', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .J2V21wcp5ddf6wQCcqXv').click();

    const modal = cy.get(`[data-cy=modal]`);
    modal.should('be.visible');

    cy.get(`[data-cy=modal-close]`).click();
    modal.should('not.exist');
  });

  it('закрытие модального окна кнопкой', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .J2V21wcp5ddf6wQCcqXv').click();

    const modal = cy.get(`[data-cy=modal]`);

    cy.get(`[data-cy=modal-close]`).click();
    modal.should('not.exist');
  });

  it('закрытие модального окна кнопкой', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .J2V21wcp5ddf6wQCcqXv').click();

    const modal = cy.get(`[data-cy=modal]`);

    cy.get(`[data-cy=modal-overlay]`).click({ force: true });
    modal.should('not.exist');
  });
});
