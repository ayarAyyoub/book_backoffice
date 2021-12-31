package com.project.books.commons.exceptions.advices;

import com.project.books.commons.exceptions.BaseException;
import com.project.books.commons.exceptions.ErrorResponse;
import com.project.books.commons.exceptions.InvalidOperationException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;


@ControllerAdvice
public class ExceptionControllerAdvice  {

    @ExceptionHandler({
            InvalidOperationException.class,
            BaseException.class
    })
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleErrorException(Exception exception) {
        var response = new ErrorResponse();

        if (exception instanceof RuntimeException) {
            var  baseException = (BaseException) exception;
            response.setMessage(baseException.getMessage());

            return ResponseEntity.status(baseException.getStatus())
                    .body(response);
        }

        response.setMessage(ExceptionMessages.GENERIC_ERROR);

        return ResponseEntity.internalServerError()
                .body(response);
    }


    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse.FormsError> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        Consumer<ObjectError> formErrorsBuilder = error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        };

        ex.getBindingResult().getAllErrors().forEach(formErrorsBuilder);
        var response = new ErrorResponse.FormsError();
        response.setErrors(errors);
        return  ResponseEntity.badRequest()
                .body(response);


    }




}
