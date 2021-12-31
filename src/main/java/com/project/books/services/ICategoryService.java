package com.project.books.services;


import com.project.books.services.dto.CategoryDto;
import org.springframework.data.domain.Page;

public interface ICategoryService {

    CategoryDto persist(CategoryDto author);

    CategoryDto getById(Long id);

    Page<CategoryDto> getAll(Integer page, Integer size);

    void delete(Long id);

}
