package com.project.books.controllers;

import com.project.books.commons.constants.ApiPaths;
import com.project.books.commons.exceptions.InvalidOperationException;
import com.project.books.commons.exceptions.NotFoundException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.services.ICategoryService;
import com.project.books.services.dto.CategoryDto;
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
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping(ApiPaths.API_CATEGORIES)
    public ResponseEntity<CategoryDto> add(@Valid @RequestBody CategoryDto categoryDto) throws URISyntaxException {

        if(Objects.nonNull(categoryDto.getId())){
            throw new InvalidOperationException(ExceptionMessages.ID_SHOULD_NOT_BE_ASSIGNED);
        }
        var theResult = categoryService.persist(categoryDto);
        return ResponseEntity
                .created(UriComponentsBuilder
                        .fromPath(ApiPaths.API_CATEGORIES)
                        .buildAndExpand(theResult.getId()).toUri())
                .body(theResult);
    }


    @PutMapping(ApiPaths.API_CATEGORIES)
    public ResponseEntity<CategoryDto> update(@Valid @RequestBody  CategoryDto categoryDto) {

        if(Objects.isNull(categoryDto.getId())){
            throw new InvalidOperationException(ExceptionMessages.ID_SHOULD_BE_ASSIGNED_TO_UPDATE_EXISTED_RESOURCE);
        }

        var theResult = categoryService.persist(categoryDto);
        return ResponseEntity
                .ok(theResult);
    }

    @GetMapping(ApiPaths.API_CATEGORIES+ "/{id}")
    public ResponseEntity<CategoryDto> get(
            @Valid @Min(value = 0, message = ValidationMessages.SHOULD_BE_POSITIVE)
            @PathVariable Long id) {
        return ResponseEntity
                .ok(categoryService.getById(id));
    }

    @GetMapping(ApiPaths.API_CATEGORIES)
    public ResponseEntity<List<CategoryDto>> getAll(
             @PathParam("page") Integer page,
             @PathParam("size") Integer size) {

        var result = categoryService.getAll(page,size);
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

    @DeleteMapping(ApiPaths.API_CATEGORIES+ "/{id}")
    public ResponseEntity delete(
            @Valid @Min(value = 0, message = ValidationMessages.SHOULD_BE_POSITIVE)
            @PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok().build();
    }

}
