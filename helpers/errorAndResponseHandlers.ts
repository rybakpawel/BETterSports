import { ErrorType } from "@prisma/client";

export class AppError extends Error {
    statusCode: number;
    errorType: ErrorType;

    constructor(message: string, statusCode = 500, errorType: ErrorType) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class CoreError extends AppError {
    constructor(message: string) {
        super(message, 500, ErrorType.CORE);
    }
}

export class LogicError extends AppError {
    constructor(message: string, statusCode = 400) {
        super(message, statusCode, ErrorType.LOGIC);
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
