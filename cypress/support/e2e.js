// Global support for Cypress E2E
import 'cypress-mochawesome-reporter/register';
import './commands';
import './auth';
import './api';

Cypress.on('uncaught:exception', () => false);
