describe('Transferencias', () => {
   beforeEach(() => {
    cy.visit('/')
    cy.fazerLoginComCredenciaisValidas()
   })

   it('Deve transferir quando informo dados e valor válidos', () => {
    cy.realizarTransferencia('Maria Oliveira', 'João da Silva', '11')

    cy.verificarMensagemNoToast('Transferência realizada!')
   })

   it('Deve apresentar erro quando tentar transferir mais que 5 mil sem o token', () => {
    cy.realizarTransferencia('Maria Oliveira', 'João da Silva', '24000')

    cy.verificarMensagemNoToast('Saldo insuficiente para realizar a transferência.')
   })
})