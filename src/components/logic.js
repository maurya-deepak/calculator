a = ["11", "111", "0.23", "0000.002330"];
for (let i = 0; i < a.length; i++) {
  if (a[i][0] === "0") {
    a[i] = a[i].replace(/^0+/, "0");
  }
}

console.log(a);
a = ["11", "111", "0.4443", "0000.233", "0.033"];
for (let i = 0; i < a.length; i++) {
  if (a[i][0] === "0") {
    a[i] = +a[i];
  }
}
console.log(a);
