export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

interface MathOperations {
  add(num: number): void;
  subtract(num: number): void;
  divide(num: number): void;
  multiply(num: number): void;
  getResult(): number;
}
