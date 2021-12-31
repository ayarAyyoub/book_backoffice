package com.project.books.services.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.books.commons.constants.Constants;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.dao.entities.AuthorEntity;
import com.project.books.dao.entities.PhotoEntity;

import javax.validation.constraints.*;
import java.util.Date;


public class PhotoDto {


    @JsonProperty("photo_id")
    @Min(value = 0,message = ValidationMessages.SHOULD_BE_POSITIVE)
    private Long id;

    @NotBlank(message = ValidationMessages.LINK_IS_REQUIRED)
    @Size(max = 255, message = ValidationMessages.MAX_LENGTH_IS_255)
    @JsonProperty("link")
    private String link;


    public PhotoEntity convertToEntity(){
        var entity = new PhotoEntity();
        entity.setId(this.getId());
        entity.setLink(this.getLink());

        return entity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
