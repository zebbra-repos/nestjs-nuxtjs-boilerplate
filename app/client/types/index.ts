export interface INotification {
  color: string;
  message?: string;
  timeout: number;
}

export interface CustomValidationError {
  property: string;
  value: string;
  message: string;
}
