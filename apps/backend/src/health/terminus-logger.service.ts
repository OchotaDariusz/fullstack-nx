import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ scope: Scope.TRANSIENT })
export class TerminusLoggerService extends ConsoleLogger {
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    const dateString = new Date().toDateString();
    const formattedMessage = `${dateString} [ERROR] ${message}`;
    super.error(formattedMessage, stack, context, ...rest);
  }

  warn(message: any, stack?: string, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    const dateString = new Date().toDateString();
    const formattedMessage = `${dateString} [WARN] ${message}`;
    super.warn(formattedMessage, stack, context, ...rest);
  }

  log(message: any, stack?: string, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    const dateString = new Date().toDateString();
    const formattedMessage = `${dateString} [LOG] ${message}`;
    super.log(formattedMessage, stack, context, ...rest);
  }
}
