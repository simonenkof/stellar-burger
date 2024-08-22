describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as('order');
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('добавление булки в конструктор', () => {
    cy.get(`[data-cy=bun-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=burger-constructor-bun-1]`).contains('Краторная булка N-200i').should('exist');
    cy.get(`[data-cy=burger-constructor-bun-2]`).contains('Краторная булка N-200i').should('exist');
  });

  it('добавление начинки в конструктор', () => {
    cy.get(`[data-cy=mains-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=sauces-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=burger-constructor-mains]`).contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get(`[data-cy=burger-constructor-mains]`).contains('Соус Spicy-X').should('exist');
  });

  it('открытие модального окна с информацией об ингредиенте', () => {
    cy.get(`[data-cy=bun-ingredients]`).contains('Краторная булка N-200i').click();

    const modal = cy.get(`[data-cy=modal]`);
    modal.should('be.visible');

    cy.get(`[data-cy=modal-close]`).click();
    modal.should('not.exist');
  });

  it('закрытие модального окна кнопкой', () => {
    cy.get(`[data-cy=bun-ingredients]`).contains('Краторная булка N-200i').click();

    const modal = cy.get(`[data-cy=modal]`);

    cy.get(`[data-cy=modal-close]`).click();
    modal.should('not.exist');
  });

  it('закрытие модального окна кнопкой', () => {
    cy.get(`[data-cy=bun-ingredients]`).contains('Краторная булка N-200i').click();

    const modal = cy.get(`[data-cy=modal]`);

    cy.get(`[data-cy=modal-overlay]`).click({ force: true });
    modal.should('not.exist');
  });

  it('Создание заказа', () => {
    window.localStorage.setItem('refreshToken', 'tst');
    cy.setCookie('accessToken', 'tst');

    cy.get(`[data-cy=bun-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=mains-ingredients]`).contains('Добавить').click();
    cy.get(`[data-cy=button-container]`).contains('Оформить заказ').click();

    cy.get(`[data-cy=order-modal]`).contains('123').should('exist');

    cy.get(`[data-cy=modal-close]`).click();
    cy.get(`[data-cy=order-modal]`).should('not.exist');

    cy.get(`[data-cy=burger-constructor]`).contains('Краторная булка N-200i').should('not.exist');
    cy.get(`[data-cy=burger-constructor]`).contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get(`[data-cy=burger-constructor]`).contains('Краторная булка N-200i').should('not.exist');
  });
});
