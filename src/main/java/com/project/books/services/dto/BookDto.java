package com.project.books.services.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.books.commons.constants.Constants;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.dao.entities.AuthorEntity;
import com.project.books.dao.entities.BookEntity;
import com.project.books.dao.entities.CategoryEntity;
import com.project.books.dao.entities.PhotoEntity;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


public class BookDto {


    @JsonProperty("book_id")
    @Min(value = 0,message = ValidationMessages.SHOULD_BE_POSITIVE)
    private Long id;

    @NotBlank(message = "title is required")
    @Size(max = 255, message = ValidationMessages.MAX_LENGTH_IS_255)
    @JsonProperty("title")
    private String title;

    @JsonProperty("total_pages")
    @Min(value = 0,message = ValidationMessages.SHOULD_BE_POSITIVE)
    private Integer totalPages;

    @JsonProperty("published_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @NotNull(message = ValidationMessages.PUBLISHED_DATE_IS_REQUIRED)
    @Past(message = ValidationMessages.PUBLISHED_DATE_SHOULD_BE_IN_THE_PAST)
    private Date publishedDate;
    @JsonProperty("categories")
    private List<CategoryDto> category;
    private AuthorDto author;
    private PhotoDto photo;



    public BookEntity convertToEntity(){
        var entity = new BookEntity();
        entity.setId(this.getId());
        entity.setTitle(this.getTitle());
        entity.setPublishedDate(this.getPublishedDate());
        entity.setTotalPages(this.getTotalPages());
        entity.setAuthor(this.getAuthor().convertToEntity());
        entity.setPhoto(this.getPhoto().convertToEntity());
        entity.setCategory(this.getCategory().stream()
                .map(CategoryDto::convertToEntity)
                .collect(Collectors.toList()));

        return entity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(Date publishedDate) {
        this.publishedDate = publishedDate;
    }

    public List<CategoryDto> getCategory() {
        return category;
    }

    public void setCategory(List<CategoryDto> category) {
        this.category = category;
    }

    public AuthorDto getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDto author) {
        this.author = author;
    }

    public PhotoDto getPhoto() {
        return photo;
    }

    public void setPhoto(PhotoDto photo) {
        this.photo = photo;
    }
}
