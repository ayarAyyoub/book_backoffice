package com.project.books.services.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.books.commons.exceptions.messages.ValidationMessages;

import com.project.books.dao.entities.CategoryEntity;

import javax.validation.constraints.*;
import java.util.Objects;


public class CategoryDto {


    @JsonProperty("id")
    @Min(value = 0,message = ValidationMessages.SHOULD_BE_POSITIVE)
    private Long id;

    @NotBlank(message = ValidationMessages.CATEGORY_NAME_IS_REQUIRED)
    @Size(max = 255, message = ValidationMessages.MAX_LENGTH_IS_255)
    @JsonProperty("name")
    private String name;

    @JsonProperty("parent")
    private CategoryDto parent;


    public CategoryEntity convertToEntity(){
        var entity = new CategoryEntity();
        entity.setName(this.getName());
        entity.setParent(Objects.isNull(this.getParent()) ?  null : this.getParent().convertToEntity());
        entity.setId(this.getId());

        return entity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryDto getParent() {
        return parent;
    }

    public void setParent(CategoryDto parent) {
        this.parent = parent;
    }
}
