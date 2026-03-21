import { test, expect, type Page } from '@playwright/test';

const roles = ['student', 'teacher', 'admin'] as const;
const routes = ['/teacher', '/admin'] as const;

type Role = (typeof roles)[number];

function credentialsFor(role: Role) {
  const envMap = {
    student: {
      email: process.env.E2E_STUDENT_EMAIL,
      password: process.env.E2E_STUDENT_PASSWORD,
    },
    teacher: {
      email: process.env.E2E_TEACHER_EMAIL,
      password: process.env.E2E_TEACHER_PASSWORD,
    },
    admin: {
      email: process.env.E2E_ADMIN_EMAIL,
      password: process.env.E2E_ADMIN_PASSWORD,
    },
  } as const;

  return envMap[role];
}

async function loginAs(page: Page, role: Role) {
  const creds = credentialsFor(role);

  test.skip(
    !creds.email || !creds.password,
    `Missing E2E credentials for role: ${role}`,
  );

  await page.goto('/login');

  await page.getByRole('textbox', { name: /johndoe@example.com/i }).fill(creds.email!);
  await page.locator('input[type="password"]').fill(creds.password!);
  await page.getByRole('button', { name: /^login$/i }).click();

  await expect
    .poll(
      async () => {
        const path = new URL(page.url()).pathname;
        if (role === 'student' && /^\/[^/]+$/.test(path) && !['/teacher', '/admin', '/login', '/signup'].includes(path)) {
          return path;
        }
        if (role !== 'student' && (path === '/teacher' || path === '/admin')) {
          return path;
        }

        const hasError = await page
          .getByText(/incorrect|invalid/i)
          .isVisible()
          .catch(() => false);
        if (hasError) return 'login-error';

        return 'waiting';
      },
      { timeout: 15000, message: `Login did not reach a role route for ${role}` },
    );
}

test.describe('Route access tests', () => {
  test('[ALLOW] student can access their own root route', async ({ page }) => {
    await loginAs(page, 'student');
    await expect(page).toHaveURL(/http:\/\/.*\/[^/]+$/);
  });

  for (const role of roles) {
    for (const route of routes) {
      const isOwnRoute =
        (route === '/teacher' && role === 'teacher') ||
        (route === '/admin' && role === 'admin');

      const caseTitle = isOwnRoute
        ? `[ALLOW] ${role} can access ${route}`
        : `[DENY] ${role} is denied access to ${route}`;

      test(caseTitle, async ({ page }) => {
        await loginAs(page, role);
        await page.goto(route);

        if (!isOwnRoute) {
          await expect(page).toHaveURL(/\/$/);
          return;
        }

        await expect(page).toHaveURL(new RegExp(`${route}$`));
      });
    }
  }
});
