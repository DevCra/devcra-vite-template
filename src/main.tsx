import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import { ErrorIndicator } from "./components/Indicator/ErrorIndicator.tsx";
import ModalRoot from "./components/Modal/ModalRoot.tsx";
import ReactQueryProvider from "./contexts/react-query-provider.tsx";
import ViewportContextProvider from "./contexts/viewport-provider.tsx";
import "./styles/index.css";

const enableMocking = async () => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./mocks/browser.ts");
  return worker.start();
};

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <ReactQueryProvider>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                FallbackComponent={({ error, resetErrorBoundary }) => (
                  <ErrorIndicator error={error} reset={resetErrorBoundary} />
                )}
              >
                <ViewportContextProvider>
                  <App />
                  <ModalRoot />
                  <ToastContainer />
                </ViewportContextProvider>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </ReactQueryProvider>
      </BrowserRouter>
    </StrictMode>,
  ),
);
