package com.project.books.commons.exceptions;

public class BaseException extends RuntimeException{

    private final String message;
    private final Integer status;

    public BaseException(String message , Integer status) {
        super(message);
        this.message = message;
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public Integer getStatus() {
        return status;
    }
}
