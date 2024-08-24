describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as('order');

    window.localStorage.setItem('refreshToken', 'tst');
    cy.setCookie('accessToken', 'tst');

    cy.visit('');

    cy.get(`[data-cy=bun-ingredients]`).as('bunIngredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('добавление булки в конструктор', () => {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get(`[data-cy=burger-constructor-bun-1]`).contains('Краторная булка N-200i').should('exist');
    cy.get(`[data-cy=burger-constructor-bun-2]`).contains('Краторная булка N-200i').should('exist');
  });

  it('добавление начинки в конструктор', () => {
    cy.get(`[data-cy=mains-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=sauces-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=burger-constructor-mains]`).as('mains');

    cy.get(`@mains`).contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get(`@mains`).contains('Соус Spicy-X').should('exist');
  });

  it('открытие модального окна с информацией об ингредиенте', () => {
    cy.get('@bunIngredients').contains('Краторная булка N-200i').click();
    cy.get(`[data-cy=modal]`).as('modal');

    cy.get(`@modal`).should('be.visible');
    cy.get(`@modal`).contains('Краторная булка N-200i').should('exist');

    cy.get(`[data-cy=modal-close]`).click();
    cy.get(`@modal`).should('not.exist');
  });

  it('закрытие модального окна кнопкой', () => {
    cy.get('@bunIngredients').contains('Краторная булка N-200i').click();
    cy.get(`[data-cy=modal-close]`).click();
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('закрытие модального нажатием на оверлей', () => {
    cy.get('@bunIngredients').contains('Краторная булка N-200i').click();
    cy.get(`[data-cy=modal-overlay]`).click({ force: true });
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('Создание заказа', () => {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get(`[data-cy=mains-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=button-container]`).contains('Оформить заказ').click();
    cy.get(`[data-cy=order-modal]`).as('orderModal');

    cy.get('@orderModal').contains('123').should('exist');
    cy.get(`[data-cy=modal-close]`).click();
    cy.get(`@orderModal`).should('not.exist');

    cy.get(`[data-cy=burger-constructor]`).as('burgerConstructor');

    cy.get('@burgerConstructor').contains('Краторная булка N-200i').should('not.exist');
    cy.get('@burgerConstructor').contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get('@burgerConstructor').contains('Краторная булка N-200i').should('not.exist');
  });
});
