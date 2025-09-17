
# Buggy Cars Rating - Playwright Test Automation

## 📋 Project Overview

This project contains automated end-to-end tests for the **Buggy Cars Rating** web application using [Playwright](https://playwright.dev/). The purpose of this automation suite is to verify core functionalities such as user registration, login, rating cars, and user profile management.

---

## ✅ Features

- Automated UI tests using Playwright
- Page Object Model (POM) structure for better maintainability
- Test data management using faker for dynamic data
- Supports running tests in headless or headed mode
- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel execution for faster test runs
- CI/CD integration ready (GitHub Actions)
- HTML test reports

---

## ⚙️ Prerequisites

- Node.js (>= 16.x)
- npm or yarn

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/buggy-cars-playwright.git
   cd buggy-cars-playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## 🧱 Project Structure

```text
├── tests/                  # Test spec files
├── pages/                  # Page Object Models
├── test-data/              # Test data files
├── reports/                # Test reports output
├── playwright.config.ts    # Playwright configuration file
├── package.json            # Project dependencies and scripts
├── README.md               # This readme file
```

---

## 🎯 How to Run Tests

- Run all tests:
  ```bash
  npx playwright test
  ```

- Run tests in headed mode (visible browser):
  ```bash
  npx playwright test --headed
  ```

- Run tests on a specific browser (example: chromium):
  ```bash
  npx playwright test --project=chromium
  ```

- Generate HTML report:
  ```bash
  npx playwright show-report
  ```

---

## ✅ Sample Test Command

```bash
npx playwright test tests/login.spec.ts
```

---

## 📈 Reporting

After running tests, generate a detailed HTML report with:
```bash
npx playwright show-report
```

---

## ⚡ CI/CD Integration

This project is ready for GitHub Actions integration. The sample `.github/workflows/playwright.yml` file is included for easy setup.

---

## 📚 Useful Links

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test Runner](https://playwright.dev/docs/test-intro)

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements or bug fixes.

---

## 📝 License

MIT License © 2025

---

 Pandimeena Selvaraj
