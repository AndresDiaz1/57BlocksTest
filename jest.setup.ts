import "@testing-library/jest-dom";
global.fetch = jest.fn();

// Mock Response constructor
global.Response = Response;
