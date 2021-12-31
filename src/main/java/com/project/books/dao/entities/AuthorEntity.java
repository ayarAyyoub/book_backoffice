package com.project.books.dao.entities;



import com.project.books.services.dto.AuthorDto;

import javax.persistence.*;
import java.util.Date;


@Entity(name = AuthorEntity.TABLE_NAME)
@Table(name = AuthorEntity.TABLE_NAME)
public class AuthorEntity {

    public static final String TABLE_NAME = "author";

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "author_id", nullable = false)
    private Long id;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    public AuthorDto convertToDto(){
        var dto = new AuthorDto();
        dto.setFirstName(this.getFirstName());
        dto.setLastName(this.getLastName());
        dto.setBirthDate(this.getBirthDate());
        dto.setId(this.getId());

        return dto;
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
