import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { paths } from "./paths";
import { SplashScreen } from "@/components/loading";
import MainLayout from "@/layouts/main-layout";
const LessonsPage = lazy(() => import("@/pages/lessons/lessons"));
const PracticeLessonPage = lazy(
  () => import("@/pages/lessons/practice-lesson")
);
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: (
            <MainLayout>
              <Outlet />
            </MainLayout>
          ),
          children: [
            {
              path: paths.root,
              index:true,
              element: <LessonsPage />,
            },

            {
              path: paths.signUp,
              element: <SignUpPage />,
            },
          ],
        },
      ],
    },

    {
      path: "/",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [{ path: `/lessons/:id`, element: <PracticeLessonPage /> }],
    },

    // No match
    { path: "*", element: <Navigate to={paths.page404} replace /> },
  ]);
}
