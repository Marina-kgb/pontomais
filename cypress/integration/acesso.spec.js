describe('Teste site saucedemo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/') // Acessar o site
  })

  it('Compras de produtos no site', () => {
    // Adicionar produtos no carrinho
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Verificar se o login deu certo
    cy.url().should('include', '/inventory.html')

    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .find('.btn_primary')
      .click()

    cy.contains('.inventory_item', 'Sauce Labs Bike Light')
      .find('.btn_primary')
      .click()

    cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt')
      .find('.btn_primary')
      .click()

    cy.contains('.inventory_item', 'Sauce Labs Fleece Jacket')
      .find('.btn_primary')
      .click()

    // Acessar o carrinho de compras
    cy.get('.shopping_cart_link').click()

    // Remover o item Sauce Labs Backpack
    cy.contains('.cart_item', 'Sauce Labs Backpack')
      .find('.btn_secondary')
      .click()

    // Fazer o checkout
    cy.get('.checkout_button').click()

    // Informar os dados para checkout
    cy.get('#first-name').type('Marina')
    cy.get('#last-name').type('Katria')
    cy.get('#postal-code').type('74403120')

    // Verificar se os dados de checkout estão certos
    cy.get('#first-name').should('have.value', 'Marina')
    cy.get('#last-name').should('have.value', 'Katria')
    cy.get('#postal-code').should('have.value', '74403120')

    // Restante do checkout
    cy.get('.cart_button').click()

    // Finalizar a compra
    cy.get('.cart_button').click()

    // Verificar a mensagem final de sucesso
    cy.get('.complete-header')
      .should('contain', 'THANK YOU FOR YOUR ORDER!')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('THANK YOU FOR YOUR ORDER!')
      })
  })
})
