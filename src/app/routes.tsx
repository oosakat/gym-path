import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Machines } from "./pages/Machines";
import { AIMenu } from "./pages/AIMenu";
import { Today } from "./pages/Today";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "machines", Component: Machines },
      { path: "menu", Component: AIMenu },
      { path: "today", Component: Today },
    ],
  },
]);
