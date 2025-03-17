export const getMeasuredLines = (elem: HTMLElement, val: string): number => {
  if (!elem || !val) {
    return 0;
  }

  const canvas = document.createElement("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d")!;
  const style = window.getComputedStyle(elem);

  canvasContext.font = `${style.getPropertyValue(
    "font-size",
  )} ${style.getPropertyValue("font-family")}`;

  const measuredLines = val.split("\n").reduce((acc, cur) => {
    const res = Math.max(Math.ceil(canvasContext.measureText(cur).width / elem!.offsetWidth), 1);

    return acc + res;
  }, 0);

  return measuredLines;
};
