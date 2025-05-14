import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { paths } from "./paths";
import { SplashScreen } from "@/components/loading";
import MainLayout from "@/layouts/main-layout";
import Beginner from "@/sections/lessons/components/learn/beginner";
import Intermediate from "@/sections/lessons/components/learn/intermediate";
import Advanced from "@/sections/lessons/components/learn/advanced";
import Reinfor from "@/sections/lessons/components/typing/reinfor";
import Storires from "@/sections/lessons/components/typing/storires";
const HomePage = lazy(() => import("@/pages/home/index"));
const LessonsPage = lazy(() => import("@/pages/lessons/lessons"));

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
              element: <HomePage />,
            },
            {
              path: paths.lessons,
              element: <LessonsPage />,
              children: [
                { index: true, element: <Navigate to="beginner" replace /> },
                { path: "beginner", element: <Beginner /> },
                { path: "intermediate", element: <Intermediate /> },
                { path: "advanced", element: <Advanced /> },
                { path: "reinforcement", element: <Reinfor /> },
                { path: "stories", element: <Storires /> },
              ],
            },
          ],
        },
      ],
    },

    // No match
    { path: "*", element: <Navigate to={paths.page404} replace /> },
  ]);
}
