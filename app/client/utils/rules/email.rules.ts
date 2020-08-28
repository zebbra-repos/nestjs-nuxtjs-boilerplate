const emailFormat = (property: string = "") => (v: string) =>
  /.+@.+/.test(v) || `${property} is invalid`;

export { emailFormat };
