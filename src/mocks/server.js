import {setupServer} from 'msw/node';
import {handlers} from './handlers';

// create mocking server
export const server = setupServer(...handlers);

//