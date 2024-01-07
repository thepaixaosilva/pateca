# Pateca (Plataforma de Avaliação das Turmas EaD com Correção Automática)

## Comandos básicos do Node.js (OBS: esta seção será removida futuramente):

comandos iniciais:

```bash
npm init -y
npm install nodemon --save-dev
npm install express --save
```
quando for rodar o postman, lembrar que o programa precisa rodar no terminal
node server.js

```bash
npm i swagger-ui-express
```

## Introdução

### Um pouco sobre o Git e a CLI do GitHub

Como neste semestre trabalharemos com Java, utilizaremos o [Eclipse](https://eclipseide.org/) ou o [NetBeans](https://netbeans.apache.org/front/main/) (cuja criadora, a Apache, tabmém criou o [JMeter](https://jmeter.apache.org/), inclusive). Não sei muito sobre ambas IDEs, mas há a possibilidade de não termos a praticidade de realizar os commits e pushes como temos no VSC. Sendo assim, recomendo estudar um pouco sobre a utilização do [Git](https://git-scm.com/doc) ([aqui](https://www.linkedin.com/feed/update/urn:li:activity:7108519059184336896/) estão alguns comandos corriqueiros que serão utilizados) e a CLI do GitHub (cuja documentação pode ser encontrada [aqui](https://cli.github.com/manual/gh)).

### Contribuir

Para começar a contribuir, clone o repositório localmente usando `git clone` ou `gh repo clone`. Em seguida, utilize o `gh repo sync --branch <nome-da-branch>` para sincronizar as branches nas quais deseja trabalhar sobre.

Com o repositório clonado e aberto no VSC (ou alguma outra IDE de sua preferência), rode `npm i` no terminal. E para rodar a API, recomendo a utilização do `npm run dev`, para poder efetuar correções enquanto ela está em funcionamento.

Sobre a impossibilidade de utilizar o `npm run test`: A implementação de um script de testes na API será [estudada](https://jestjs.io/docs/getting-started).

## Documentação

A documentação da API da Pateca poderá ser acessada [aqui](https://pi-pateca.onrender.com/DOCS/).

## Roadmap

No geral, há a necessidade de realizar as seguintes metas para o projeto:

- Criar o banco de dados;
- Conectar o BD com a API;
- Codificar o front-end;
- Conectar o front-end com a API;
- Criar um script de testes para a API.