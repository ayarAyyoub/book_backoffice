package com.project.books.commons.exceptions;

import com.project.books.commons.exceptions.messages.ExceptionMessages;
import org.springframework.http.HttpStatus;

public class GenericException extends BaseException {


    public GenericException() {
        super(ExceptionMessages.GENERIC_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.value());

    }

}
