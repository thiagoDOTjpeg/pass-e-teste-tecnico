/// <reference types="cypress" />

describe('To-Do List System - E2E & Integration', () => {

    beforeEach(() => {

        cy.intercept('GET', '**/api/todos*').as('getTodos');
        cy.intercept('POST', '**/api/todos').as('createTodo');
        cy.intercept('PUT', '**/api/todos/*').as('updateTodo');
        cy.intercept('DELETE', '**/api/todos/*').as('deleteTodo');


        cy.session(['teste@gmail.com', 'teste123'], () => {
            cy.visit('/login', { timeout: 120000 });
            cy.get('input[type="email"]', { timeout: 10000 }).type('teste@gmail.com');
            cy.get('input[type="password"]').type('teste123');
            cy.get('button[type="submit"]').click();
            cy.url({ timeout: 30000 }).should('include', '/dashboard');
        });

        cy.visit('/dashboard', { timeout: 120000 });
        cy.wait('@getTodos', { timeout: 30000 }).its('response.statusCode').should('eq', 200);
    });

    const getDynamicNames = () => {
        const timestamp = Date.now();
        return {
            todoName: `Tarefa_${timestamp}`,
            editedName: `Tarefa_Editada_${timestamp}`
        };
    };

    it("Happy Path: Criar, Concluir, Editar e Excluir tarefa", () => {
        const { todoName, editedName } = getDynamicNames();


        cy.get('input[placeholder*="feito"]').type(todoName);
        cy.get('button').contains('Adicionar').click();

        cy.wait('@createTodo').its('response.statusCode').should('be.oneOf', [200, 201]);
        cy.contains(todoName).should('be.visible');
        cy.get('[data-sonner-toast]').contains('sucesso').should('be.visible');


        cy.contains(todoName)
            .closest('.todo-item')
            .find('button[role="checkbox"]')
            .click();

        cy.wait('@updateTodo').its('response.statusCode').should('eq', 200);
        cy.contains(todoName).should('have.class', 'line-through');


        cy.contains(todoName)
            .closest('.todo-item')
            .find('button')
            .contains('Editar')
            .click();

        cy.get('[role="dialog"]').within(() => {
            cy.get('input#title').clear().type(editedName);
            cy.contains('button', 'Salvar').click();
        });

        cy.wait('@updateTodo').its('response.statusCode').should('eq', 200);
        cy.contains(editedName).should('be.visible');
        cy.contains(todoName).should('not.exist');


        cy.contains(editedName)
            .closest('.todo-item')
            .find('button')
            .contains('Excluir')
            .click();

        cy.get('[role="dialog"]').within(() => {
            cy.contains('button', 'Confirmar').click();
        });

        cy.wait('@deleteTodo').its('response.statusCode').should('eq', 204);
        cy.contains(editedName).should('not.exist');
    });

    it("Edge Case Error (Integration): Validar falha ao criar tarefa", () => {

        cy.intercept('POST', '**/api/todos', {
            statusCode: 500,
            body: { message: "Internal Server Error" }
        }).as('createTodoError');

        cy.get('input[placeholder*="feito"]').type('Tarefa que vai falhar');
        cy.get('button').contains('Adicionar').click();

        cy.wait('@createTodoError').its('response.statusCode').should('eq', 500);


        cy.get('[data-sonner-toast]').contains('Ocorreu um erro ao salvar').should('be.visible');
    });

    it("Persistence Test: Verificar se a paginação/filtros mantêm a integridade", () => {
        const { todoName } = getDynamicNames();


        cy.get('input[placeholder*="feito"]').type(todoName);
        cy.get('button').contains('Adicionar').click();
        cy.wait('@createTodo');


        cy.reload();
        cy.wait('@getTodos');


        cy.contains(todoName).should('be.visible');



        cy.contains('Filtrar por:').parent().find('button[role="combobox"]').click();
        cy.get('[role="option"]').contains('Concluídas').click();
        cy.wait('@getTodos');

        cy.contains(todoName).should('not.exist');


        cy.contains('Filtrar por:').parent().find('button[role="combobox"]').click();
        cy.get('[role="option"]').contains('Todas').click();
        cy.wait('@getTodos');
        cy.contains(todoName).should('be.visible');
    });
});