import { ErrorType } from "@prisma/client";

export class AppError extends Error {
    statusCode: number;
    errorType: ErrorType;
    messageLog?: string;

    constructor(
        message: string,
        statusCode = 500,
        errorType: ErrorType,
        messageLog?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.messageLog = messageLog;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class CoreError extends AppError {
    constructor(message: string, messageLog?: string) {
        super(message, 500, ErrorType.CORE, messageLog);
    }
}

export class LogicError extends AppError {
    constructor(message: string, statusCode = 400, messageLog?: string) {
        super(message, statusCode, ErrorType.LOGIC, messageLog);
    }
}

export class ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;

    constructor(
        success: boolean,
        statusCode: number,
        message: string,
        data?: T
    ) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
