package com.project.books.dao.entities;

import com.project.books.services.dto.CategoryDto;
import com.project.books.services.dto.PhotoDto;

import javax.persistence.*;
import java.util.Set;

@Entity(name = PhotoEntity.TABLE_NAME)
@Table(name = PhotoEntity.TABLE_NAME)
public class PhotoEntity {
    public static final String TABLE_NAME = "photo";
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "photo_id", nullable = false)
    private Long id;
    @Column(name = "link", nullable = false)
    private String link;


    public PhotoDto convertToDto(){
        var target = new PhotoDto();
        target.setId(this.getId());
        target.setLink(this.getLink());
        return target;
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
