package com.project.books.services.impl;

import com.project.books.commons.exceptions.GenericException;
import com.project.books.commons.exceptions.InvalidInputException;
import com.project.books.commons.exceptions.NotFoundException;
import com.project.books.commons.exceptions.messages.ExceptionMessages;
import com.project.books.dao.entities.BookEntity;
import com.project.books.dao.repositories.IBookRepository;
import com.project.books.services.IBookService;
import com.project.books.services.dto.BookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
public class BookServiceImpl implements IBookService {


    private final IBookRepository bookRepository;


    public BookServiceImpl(IBookRepository bookRepository ) {
        this.bookRepository = bookRepository;
    }

    @Override
    public BookDto persist(BookDto book) {


        try {
           var  result = bookRepository.save(book.convertToEntity());

            return result.convertToDto();
        } catch (Exception e) {
            throw new GenericException();
        }

    }

    @Override
    public BookDto getById(Long id) {

        var result = bookRepository.findById(id);

        if(result.isPresent()){
            return result.get().convertToDto();
        }

        throw new NotFoundException(ExceptionMessages.NOT_FOUND);

    }

    @Override
    public Page<BookDto> getAll(Integer page, Integer size) {


        if(Objects.isNull(page) || Objects.isNull(size) || page <0 || size <1){
            throw new InvalidInputException(ExceptionMessages.PAGE_OR_SIZE_IS_NOT_VALID);
        }


        var result = bookRepository.findAll(PageRequest.of(page, size));

        return result.map(BookEntity::convertToDto) ;
    }

    @Override
    public void delete(Long id) {
        var result = bookRepository.findById(id);
        if(result.isEmpty()){
            throw new NotFoundException(ExceptionMessages.NOT_FOUND);
        }
        bookRepository.deleteById(id);
    }
}
