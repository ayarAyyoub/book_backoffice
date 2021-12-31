package com.project.books.services.impl;

import com.project.books.commons.exceptions.GenericException;
import com.project.books.commons.exceptions.InvalidInputException;
import com.project.books.commons.exceptions.NotFoundException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import com.project.books.dao.entities.CategoryEntity;
import com.project.books.dao.repositories.ICategoryRepository;
import com.project.books.services.ICategoryService;
import com.project.books.services.dto.CategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
public class CategoryServiceImpl implements ICategoryService {


    private final ICategoryRepository categoryRepository;


    public CategoryServiceImpl(ICategoryRepository categoryRepository ) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDto persist(CategoryDto categoryDto) {


        try {
           var  result = categoryRepository.save(categoryDto.convertToEntity());

            return result.convertToDto(0);
        } catch (Exception e) {

            throw new GenericException();
        }

    }

    @Override
    public CategoryDto getById(Long id) {

        var result = categoryRepository.findById(id);

        if(result.isPresent()){
            return result.get().convertToDto(0);
        }

        throw new NotFoundException(ExceptionMessages.NOT_FOUND);

    }

    @Override
    public Page<CategoryDto> getAll(Integer page, Integer size) {

        if(Objects.isNull(page) || Objects.isNull(size) || page <0 || size <1){
            throw new InvalidInputException(ExceptionMessages.PAGE_OR_SIZE_IS_NOT_VALID);
        }
        var result = categoryRepository.findAll(PageRequest.of(page, size));

         return  result.map(c ->c.convertToDto(0));
    }

    @Override
    public void delete(Long id) {
        var result = categoryRepository.findById(id);
        if(result.isEmpty()){
            throw new NotFoundException(ExceptionMessages.NOT_FOUND);
        }
        categoryRepository.deleteById(id);
    }
}
