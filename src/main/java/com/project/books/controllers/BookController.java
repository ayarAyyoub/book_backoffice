package com.project.books.controllers;

import com.project.books.commons.constants.ApiPaths;
import com.project.books.commons.exceptions.InvalidOperationException;
import com.project.books.commons.exceptions.NotFoundException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.services.IBookService;
import com.project.books.services.dto.BookDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.websocket.server.PathParam;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookController {

    private final IBookService bookService;

    public BookController(IBookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping(ApiPaths.API_BOOKS)
    public ResponseEntity<BookDto> add(@Valid @RequestBody BookDto bookDto) throws URISyntaxException {

        if(Objects.nonNull(bookDto.getId())){
            throw new InvalidOperationException(ExceptionMessages.ID_SHOULD_NOT_BE_ASSIGNED);
        }

        var theResult = bookService.persist(bookDto);
        return ResponseEntity
                .created(UriComponentsBuilder
                        .fromPath(ApiPaths.API_BOOKS)
                        .buildAndExpand(theResult.getId()).toUri())
                .body(theResult);
    }


    @PutMapping(ApiPaths.API_BOOKS)
    public ResponseEntity<BookDto> update(@Valid @RequestBody  BookDto bookDto) {

        if(Objects.isNull(bookDto.getId())){
            throw new InvalidOperationException(ExceptionMessages.ID_SHOULD_BE_ASSIGNED_TO_UPDATE_EXISTED_RESOURCE);
        }

        var theResult = bookService.persist(bookDto);
        return ResponseEntity
                .ok(theResult);
    }

    @GetMapping(ApiPaths.API_BOOKS+ "/{id}")
    public ResponseEntity<BookDto> get(
            @Valid @Min(value = 0, message = ValidationMessages.SHOULD_BE_POSITIVE)
            @PathVariable Long id) {
        return ResponseEntity
                .ok(bookService.getById(id));
    }

    @GetMapping(ApiPaths.API_BOOKS)
    public ResponseEntity<List<BookDto>> getAll(
             @PathParam("page") Integer page,
             @PathParam("size") Integer size) {


        var result = bookService.getAll(page,size);

        if (page > result.getTotalPages()) {
            throw new NotFoundException(ExceptionMessages.NOT_FOUND);
        }
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("total-pages", String.valueOf(result.getTotalPages()));

        return ResponseEntity
            .ok()
            .headers(responseHeaders)
            .body(result.getContent());
    }

    @DeleteMapping(ApiPaths.API_BOOKS+ "/{id}")
    public ResponseEntity delete(
            @Valid @Min(value = 0, message = ValidationMessages.SHOULD_BE_POSITIVE)
            @PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.ok().build();
    }

}
