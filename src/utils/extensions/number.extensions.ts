// export {};

// declare global {
//   interface Number {
//     pad(size: number): string;
//     numberWithComma(): string;
//   }
// }

// Number.prototype.pad = function (size: number): string {
//   let num = this.toString();
//   while (num.length < size) num = '0' + num;
//   return num;
// };

// Number.prototype.numberWithComma = function (): string {
//   let x = this.toString();
//   var pattern = /(-?\d+)(\d{3})/;
//   while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
//   return x;
// };
