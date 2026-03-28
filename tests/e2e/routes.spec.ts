import { test, expect, type Page } from '@playwright/test';

const roles = ['student', 'teacher', 'admin'] as const;
const routes = ['/student', '/teacher', '/admin'] as const;

type Role = (typeof roles)[number];

const roleHome: Record<Role, string> = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};

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
        if (path === '/student' || path === '/teacher' || path === '/admin') return path;

        const hasError = await page
          .getByText(/incorrect|invalid/i)
          .isVisible()
          .catch(() => false);
        if (hasError) return 'login-error';

        return 'waiting';
      },
      { timeout: 15000, message: `Login did not reach a role route for ${role}` },
    )
    .toBe(roleHome[role]);
}

test.describe('Route access tests', () => {
  for (const role of roles) {
    for (const route of routes) {
      const isOwnRoute =
        (route === '/student' && role === 'student') ||
        (route === '/teacher' && role === 'teacher') ||
        (route === '/admin' && role === 'admin');
      const caseTitle = isOwnRoute
        ? `[ALLOW] ${role} can access ${route}`
        : `[DENY] ${role} is denied access to ${route}`;
      test(caseTitle, async ({ page }) => {
        await loginAs(page, role);
        await page.goto(route);
        const shouldRedirectToOwnDashboard =
          (route === '/student' && role !== 'student') ||
          (route === '/teacher' && role !== 'teacher') ||
          (route === '/admin' && role !== 'admin');

        if (shouldRedirectToOwnDashboard) {
          await expect(page).toHaveURL(/\/$/);
          return;
        }
        await expect(page).toHaveURL(new RegExp(`${route}$`));
      });
    }
  }
});
