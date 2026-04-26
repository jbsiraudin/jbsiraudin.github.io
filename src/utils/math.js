export function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let tmp = 1;
  for (let i = 2; i <= n; i++) tmp *= i;
  return tmp;
}
