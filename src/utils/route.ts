export const routeViewTransition = (cb: () => void): void => {
  if (!document.startViewTransition) {
    cb();
    return;
  }

  document.startViewTransition(() => {
    cb();
  });
};
