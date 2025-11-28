export const currency = (n: number) =>
  typeof n === "number" ? "KSh " + n.toLocaleString("en-KE") : n;
