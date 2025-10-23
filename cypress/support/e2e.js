// Global support for Cypress E2E
import 'cypress-mochawesome-reporter/register';
import '../modules/core/commands';
import '../modules/auth/ui-auth';
import '../modules/api/client';

Cypress.on('uncaught:exception', () => false);
