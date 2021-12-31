package com.project.books.controllers;

import com.project.books.commons.constants.ApiPaths;
import com.project.books.commons.exceptions.InvalidOperationException;
import com.project.books.commons.exceptions.NotFoundException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.services.IAuthorService;
import com.project.books.services.dto.AuthorDto;
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
public class AuthorController {

    private final IAuthorService authorService;

    public AuthorController(IAuthorService authorService) {
        this.authorService = authorService;
    }

    @PostMapping(ApiPaths.API_AUTHORS)

    public ResponseEntity<AuthorDto> add(@Valid @RequestBody  AuthorDto author) throws URISyntaxException {

        if(Objects.nonNull(author.getId())){
            throw new InvalidOperationException(ExceptionMessages.ID_SHOULD_NOT_BE_ASSIGNED);
        }

        var theResult = authorService.persist(author);
        return ResponseEntity
                .created(UriComponentsBuilder
                        .fromPath(ApiPaths.API_AUTHORS)
                        .buildAndExpand(theResult.getId()).toUri())
                .body(theResult);
    }


    @PutMapping(ApiPaths.API_AUTHORS)
    public ResponseEntity<AuthorDto> update(@Valid @RequestBody  AuthorDto author) {

        if(Objects.isNull(author.getId())){
            throw new InvalidOperationException(ExceptionMessages.ID_SHOULD_BE_ASSIGNED_TO_UPDATE_EXISTED_RESOURCE);
        }

        var theResult = authorService.persist(author);
        return ResponseEntity
                .ok(theResult);
    }

    @GetMapping(ApiPaths.API_AUTHORS+ "/{id}")
    public ResponseEntity<AuthorDto> get(
            @Valid @Min(value = 0, message = ValidationMessages.SHOULD_BE_POSITIVE)
            @PathVariable Long id) {
        return ResponseEntity
                .ok(authorService.getById(id));
    }

    @GetMapping(ApiPaths.API_AUTHORS)
    public ResponseEntity<List<AuthorDto>> getAll(
             @PathParam("page") Integer page,
             @PathParam("size") Integer size) {

        var result = authorService.getAll(page,size);

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

    @DeleteMapping(ApiPaths.API_AUTHORS+ "/{id}")
    public ResponseEntity delete(
            @Valid @Min(value = 0, message = ValidationMessages.SHOULD_BE_POSITIVE)
            @PathVariable Long id) {
        authorService.delete(id);
        return ResponseEntity.ok().build();
    }

}
