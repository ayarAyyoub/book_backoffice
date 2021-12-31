package com.project.books.services.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.project.books.commons.constants.Constants;
import com.project.books.commons.exceptions.messages.ValidationMessages;
import com.project.books.dao.entities.AuthorEntity;


import javax.validation.constraints.*;
import java.util.Date;



public class AuthorDto {


    @JsonProperty("id")
    @Min(value = 0,message = ValidationMessages.SHOULD_BE_POSITIVE)
    private Long id;

    @NotBlank(message = ValidationMessages.FIRSTNAME_IS_REQUIRED)
    @Size(max = 255, message = ValidationMessages.MAX_LENGTH_IS_255)
    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    @NotBlank(message = ValidationMessages.LAST_NAME_IS_REQUIRED)
    @Size(max = 255, message = ValidationMessages.MAX_LENGTH_IS_255)
    private String lastName;

    @JsonProperty("birth_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = Constants.DATE_FORMAT)
    @NotNull(message = ValidationMessages.BIRTH_DATE_IS_REQUIRED)
    @Past(message = ValidationMessages.BIRTH_DATE_IN_PAST)
    private Date birthDate;

    public AuthorEntity convertToEntity(){
        var entity = new AuthorEntity();
        entity.setFirstName(this.getFirstName());
        entity.setLastName(this.getLastName());
        entity.setBirthDate(this.getBirthDate());
        entity.setId(this.getId());

        return entity;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }
}
