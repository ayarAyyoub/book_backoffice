package com.project.books.commons.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidInputException extends BaseException{



    public InvalidInputException(String message) {
        super( message, HttpStatus.BAD_REQUEST.value());

    }




}
