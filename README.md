
# Banco Web Tests — Testes automatizados com Cypress (Mentoria 2.0)

Este repositório contém uma suíte de testes end-to-end criada como material didático para a **Mentoria 2.0** — o objetivo é mostrar aos alunos como automatizar verificações de uma aplicação web utilizando **Cypress** e **JavaScript**.

💡 Objetivo
- Fornecer exemplos práticos (login e transferências) que demonstram como organizar testes, usar fixtures, criar comandos personalizados (Custom Commands) e gerar relatórios com o `cypress-mochawesome-reporter`.

⚙️ Tecnologias e dependências
- JavaScript (CommonJS)
- Cypress (E2E runner) — versão especificada em `package.json` (devDependency)
- cypress-mochawesome-reporter (relatórios HTML) — dependência de projeto

Observação: todas as dependências do projeto estão declaradas em `package.json`.

Pré-requisitos
- Node.js (recomendado 16+) e npm instalados na máquina

Instalação
1. Clone o repositório

```powershell
git clone https://github.com/srosanaf/banco-web-tests.git
cd banco-web-tests
```

2. Instale as dependências

```powershell
npm install
```


Executando os testes

- Executar todos os testes em modo headless (CLI):

```powershell
npm test
```

- Abrir o Test Runner (modo interativo) — útil durante desenvolvimento/debug:

```powershell
npm run cy.open
```

- Executar em modo headed (útil para visualizar em CI local):

```powershell
npm run cy.headed
```

Configuração do Cypress

Configuração do Cypress (padrão do projeto)
- `cypress.config.js` define `baseUrl: 'http://localhost:4000'` — os testes esperam que a aplicação esteja disponível nesse endereço por padrão.
- `video: false` (não grava vídeo por default)
- `reporter: 'cypress-mochawesome-reporter'` e plugin configurado para gerar relatórios HTML e JSON em `cypress/reports/html`.

Importante: para executar os testes com sucesso é necessário colocar os dois componentes (API e aplicação web) em execução localmente. Os repositórios de referência são:
- API: https://github.com/juliodelimas/banco-web
- Aplicação web: https://github.com/juliodelimas/banco-api

Certifique-se de que a aplicação web esteja servindo em `http://localhost:4000` ou ajuste `baseUrl` via variável de ambiente/override na execução do Cypress.

Estrutura do projeto

```
├─ cypress/
│  ├─ e2e/                      # Specs (ex.: `login.cy.js`, `transferencia.cy.js`)
│  ├─ fixtures/                 # Dados de entrada (ex.: `credenciais.json`)
│  ├─ support/                  # Comandos customizados e helpers
│  │   └─ commands/             # Comandos reutilizáveis (login, transferencia, common)
│  └─ reports/                  # Relatórios HTML (quando gerado)
```


Testes (specs)
- Arquivos de spec principais:
  - `cypress/e2e/login.cy.js` — cenários relacionados a login (login com credenciais válidas / inválidas)
  - `cypress/e2e/transferencia.cy.js` — cenários de transferência (valor válido / tentativa de transferência com saldo insuficiente)

As specs usam fixtures e custom commands para deixar os testes mais legíveis e fáceis de manter.


Fixtures
- `cypress/fixtures/credenciais.json` — contém dados de teste (usuários válidos e inválidos) usados nas rotinas de login.


Comandos customizados (Custom Commands)
O projeto organiza ações comuns em `cypress/support/commands/` para reduzir duplicação e deixar as specs mais expressivas. Comandos disponíveis:

- `fazerLoginComCredenciaisValidas()`
  - Onde: `cypress/support/commands/login.js`
  - O que faz: carrega `credenciais.valida` do fixture `credenciais.json`, preenche os campos `#username` e `#senha` e clica em `Entrar`.

- `fazerLoginComCredenciaisInvalidas()`
  - Onde: `cypress/support/commands/login.js`
  - O que faz: carrega `credenciais.invalida` e tenta logar; usado para verificar mensagens de erro no toast.

- `realizarTransferencia(contaOrigem, contaDestino, valor)`
  - Onde: `cypress/support/commands/transferencia.js`
  - O que faz: seleciona contas de origem/destino (`selecionarOpcaoNaCombobox`), insere valor e clica em `Transferir`.

- `verificarMensagemNoToast(mensagem)`
  - Onde: `cypress/support/commands/common.js`
  - O que faz: faz assert no elemento `.toast` verificando o texto exato recebido.

- `selecionarOpcaoNaCombobox(labelDoCampo, opcao)`
  - Onde: `cypress/support/commands/common.js`
  - O que faz: localiza um campo com `label[for="labelDoCampo"]` e seleciona a opção desejada no dropdown.


Dicas práticas
- Rodar um spec específico (ex.: login):

```powershell
npx cypress run --spec "cypress/e2e/login.cy.js"
```

- Alternar `baseUrl` sem mudar o arquivo de configuração (ex.: CI):

```powershell
npx cypress run --config baseUrl=http://outro-host:4000
```

Configurando no CI, lembre-se de iniciar a API e a aplicação web antes de executar os testes ou usar um serviço/step que faça isso (ex.: docker-compose ou jobs separados).

Como contribuir
- Adicione novos testes em `cypress/e2e/` seguindo a convenção `*.cy.js`.
- Reutilize / crie comandos em `cypress/support/commands/` para evitar duplicação.
- Crie fixtures em `cypress/fixtures/` para dados estáticos de teste.
- Abra PRs com descrições claras e labels, adicionando testes e documentação quando aplicável.


CI / Integração contínua (sugestão)
- Exemplo de passos mínimos no pipeline:

```powershell
npm ci
# subir API e app (docker-compose ou comandos específicos)
npm test
```

Garanta que o reporter gere artefatos (JSON/HTML) para que o servidor de CI os salve como artifacts para análise.


Licença
- ISC (conforme `package.json`)

Problemas e melhorias
- Se encontrar problemas nos testes, abra uma issue descrevendo o cenário, sistema (SO / Node / versão do Cypress) e passos para reproduzir.

---

Se quiser, eu posso também adicionar um badge de status, ou configurar um pipeline exemplo (GitHub Actions) para executar os testes automaticamente em cada PR. 🚀
