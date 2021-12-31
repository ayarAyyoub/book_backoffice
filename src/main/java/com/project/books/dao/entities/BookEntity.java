package com.project.books.dao.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.books.commons.constants.Constants;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.services.dto.BookDto;
import com.project.books.services.dto.CategoryDto;
import com.project.books.services.dto.PhotoDto;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Entity(name = BookEntity.TABLE_NAME)
@Table(name = BookEntity.TABLE_NAME)
public class BookEntity {
    public static final String TABLE_NAME = "book";
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "book_id", nullable = false)
    private Long id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "total_pages", nullable = false)
    private Integer totalPages;

    @JsonProperty("published_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @NotNull(message = ValidationMessages.PUBLISHED_DATE_IS_REQUIRED)
    @Past(message = ValidationMessages.PUBLISHED_DATE_SHOULD_BE_IN_THE_PAST)
    private Date publishedDate;

    @ManyToMany
    @JoinTable(
            name = "category_book",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<CategoryEntity> category;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private AuthorEntity author;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "photo_id")
    private PhotoEntity photo;


    public BookDto convertToDto(){
        var dto = new BookDto();
        dto.setId(this.getId());
        dto.setTitle(this.getTitle());
        dto.setPublishedDate(this.getPublishedDate());
        dto.setTotalPages(this.getTotalPages());
        dto.setAuthor(this.getAuthor().convertToDto());
        dto.setPhoto(this.getPhoto().convertToDto());
        dto.setCategory(this.getCategory().stream()
                .map(c ->c.convertToDto(0))
                .collect(Collectors.toList()));
        return dto;
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

    public List<CategoryEntity> getCategory() {
        return category;
    }

    public void setCategory(List<CategoryEntity> category) {
        this.category = category;
    }

    public AuthorEntity getAuthor() {
        return author;
    }

    public void setAuthor(AuthorEntity author) {
        this.author = author;
    }

    public PhotoEntity getPhoto() {
        return photo;
    }

    public void setPhoto(PhotoEntity photo) {
        this.photo = photo;
    }
}
