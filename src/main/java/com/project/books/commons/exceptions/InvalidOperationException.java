package com.project.books.commons.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidOperationException extends BaseException{



    public InvalidOperationException(String message) {
        super( message, HttpStatus.NOT_ACCEPTABLE.value());

    }




}
