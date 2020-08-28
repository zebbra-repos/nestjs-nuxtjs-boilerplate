const required = (property: string = "") => (v: string) =>
  !!v || `${property} is required`;

const minLength = (
  length: number = 3,
  optional: boolean = false,
  property: string = "",
) => (v: string) =>
  (optional && v.length === 0) ||
  v.length >= length ||
  `${property} must be at least ${length} characters`;

const maxLength = (length: number = 32, property: string = "") => (v: string) =>
  v.length <= length || `${property} must be less than ${length} characters`;

export { required, minLength, maxLength };
