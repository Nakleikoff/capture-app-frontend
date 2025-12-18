# Capture App – UI Test Strategy

## 1. Purpose

This document defines the test strategy for **automated UI testing** of the Capture App frontend.

The objective of UI testing is to ensure that the user interface behaves correctly, supports long-running review sessions, and integrates reliably with backend services.

Detailed UI test cases are maintained in a separate Test Case document and are referenced from this strategy.

---

## 2. Scope

### In Scope
- Single Page Application (SPA) rendering
- Review section tab navigation
- Loading correct questions per section
- Employee selection from dropdown
- Adding a new employee to review
- Radio button selection (Yes / No / Not Sure)
- Free-text note entry
- Data retention across tab navigation
- Submit workflow and success/error handling
- UI validation and messaging

### Out of Scope
- Backend business logic validation
- Database schema and data integrity validation
- Performance, load, security, and accessibility testing

---

## 3. Test Approach

### Test Type
- Automated UI testing
- End-to-end UI flows using real backend services

### Frameworks & Tools
- **Jest** – test runner and assertions
- **Playwright** – browser automation

### Execution Model
- Tests run against a deployed test environment
- Real API calls are made to backend services
- No mocking of backend responses at UI level
- Browser state reset between tests

---

## 4. Test Environment

| Component | Description |
|----------|-------------|
| Frontend | Capture App Single Page Application |
| Backend  | Node.js + Express (real services) |
| Database | MySQL (dedicated test database) |
| Browser  | Chromium (default), others optional |

---

## 5. Test Data Management

- Test employees created dynamically via API calls
- Unique test data generated per test or test suite
- Data isolated between test runs
- Cleanup performed via:
  - API calls
  - Teardown scripts

---

## 6. Entry and Exit Criteria

### Entry Criteria
- UI application deployed and accessible
- Backend services available
- Test database accessible
- Environment configuration available

### Exit Criteria
- All critical and high-priority UI tests pass
- No unresolved critical UI defects
- UI regression suite completed successfully

---

## 7. Defect Management

- UI defects logged with:
  - Steps to reproduce
  - Screenshots
  - Browser console logs
- Defects classified by severity:
  - Critical
  - High
  - Medium
  - Low

---

## 8. Test Artefacts

- Automated UI test suite
- Test execution reports
- Screenshots and logs (where applicable)
- Linked UI test case documentation

---

## 9. Ownership and Maintenance

- UI tests are maintained alongside frontend code
- Tests updated as UI behavior or workflows change
- Failing tests must be investigated before release

---

## 10. Notes

This strategy complements the API and Database test strategies to provide full end-to-end coverage of the Capture App.
