export default {
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  testMatch: ["**/*.test.js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js", "!src/tests/**"],
  transform: {},
};
