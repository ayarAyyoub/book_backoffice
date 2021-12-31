package com.project.books.dao.entities;


import com.project.books.services.dto.CategoryDto;

import javax.persistence.*;
import java.util.Objects;


@Entity(name = CategoryEntity.TABLE_NAME)
@Table(name = CategoryEntity.TABLE_NAME)
public class CategoryEntity {
    public static final String TABLE_NAME = "category";
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    @ManyToOne
    @JoinColumn(name = "parent_id")

    private CategoryEntity parent;


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

    public CategoryEntity getParent() {
        return parent;
    }

    public void setParent(CategoryEntity parent) {
        this.parent = parent;
    }

    public CategoryDto convertToDto(Integer level){
        var target = new CategoryDto();
        target.setName(this.getName());
        if(level == 0)
            target.setParent(Objects.isNull(this.getParent()) ?  null : this.getParent().convertToDto(level + 1));
        target.setId(this.getId());

        return target;
    }
}
