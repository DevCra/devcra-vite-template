// export {};

// declare global {
//   interface Date {
//     formatter(format: string): string;
//     UTCformatter(format: string): string;
//     toFormatString(format: string): string;
//   }
// }

// const getDayString = (day: number) => {
//   return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][day];
// };
// Date.prototype.formatter = function date2str(format) {
//   var x = this;
//   var z = {
//     Y: x.getFullYear(),
//     D: x.getDate(),
//     d: x.getDate(),
//     H: x.getHours(),
//     h: x.getHours(),
//     M: x.getMonth() + 1,
//     m: x.getMinutes(),
//     S: x.getSeconds(),
//     s: x.getSeconds(),
//     E: x.getDay(),
//     e: x.getDay(),
//   } as any;
//   format = format.replace(/(D+|d+|H+|h+|M+|m+|S+|s+)/g, function (v) {
//     return ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2);
//   });

//   format = format.replace(/(y+|Y+)/g, function (v) {
//     return x.getFullYear().toString().slice(-v.length);
//   });

//   format = format.replace(/(E+)/g, function (v) {
//     return getDayString(x.getDay());
//   });

//   return format;
// };

// Date.prototype.UTCformatter = function date2str(format) {
//   var x = this;
//   var z = {
//     Y: x.getUTCFullYear(),
//     D: x.getUTCDate(),
//     d: x.getUTCDate(),
//     H: x.getUTCHours(),
//     h: x.getUTCHours(),
//     M: x.getUTCMonth() + 1,
//     m: x.getUTCMinutes(),
//     S: x.getUTCSeconds(),
//     s: x.getUTCSeconds(),
//     E: x.getDay(),
//     e: x.getDay(),
//   } as any;
//   format = format.replace(/(D+|d+|H+|h+|M+|m+|S+|s+)/g, function (v) {
//     return ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2);
//   });

//   return format.replace(/(y+|Y+)/g, function (v) {
//     return x.getUTCFullYear().toString().slice(-v.length);
//   });
// };

// Date.prototype.toFormatString = function (format: string) {
//   format = format.replace(/yyyy/g, `000${this.getFullYear()}`.slice(-4));
//   format = format.replace(/MM/g, `0${this.getMonth() + 1}`.slice(-2));
//   format = format.replace(/dd/g, `0${this.getDate()}`.slice(-2));
//   format = format.replace(/HH/g, `0${this.getHours()}`.slice(-2));
//   format = format.replace(/mm/g, `0${this.getMinutes()}`.slice(-2));
//   format = format.replace(/ss/g, `0${this.getSeconds()}`.slice(-2));
//   return format;
// };
