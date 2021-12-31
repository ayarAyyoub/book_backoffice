package com.project.books.services.impl;

import com.project.books.commons.exceptions.GenericException;
import com.project.books.commons.exceptions.InvalidInputException;
import com.project.books.commons.exceptions.NotFoundException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import com.project.books.dao.entities.AuthorEntity;
import com.project.books.dao.repositories.IAuthorRepository;
import com.project.books.services.IAuthorService;
import com.project.books.services.dto.AuthorDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
public class AuthorServiceImpl implements IAuthorService {


    private final IAuthorRepository authorRepository;


    public AuthorServiceImpl(IAuthorRepository authorRepository ) {
        this.authorRepository = authorRepository;
    }

    @Override
    public AuthorDto persist(AuthorDto author) {


        try {
           var  result = authorRepository.save(author.convertToEntity());

            return result.convertToDto();
        } catch (Exception e) {

            throw new GenericException();
        }

    }

    @Override
    public AuthorDto getById(Long id) {

        var result = authorRepository.findById(id);

        if(result.isPresent()){
            return result.get().convertToDto();
        }

        throw new NotFoundException(ExceptionMessages.NOT_FOUND);

    }

    @Override
    public Page<AuthorDto> getAll(Integer page, Integer size) {


        if(Objects.isNull(page) || Objects.isNull(size) || page <0 || size <1){
            throw new InvalidInputException(ExceptionMessages.PAGE_OR_SIZE_IS_NOT_VALID);
        }


        var result = authorRepository.findAll(PageRequest.of(page, size));

        return   result.map(AuthorEntity::convertToDto);
    }

    @Override
    public void delete(Long id) {
        var result = authorRepository.findById(id);
        if(result.isEmpty()){
            throw new NotFoundException(ExceptionMessages.NOT_FOUND);
        }


        try {
            authorRepository.deleteById(id);

        } catch (Exception e) {

            throw new GenericException();
        }

    }
}
