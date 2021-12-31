package com.project.books.services;


import com.project.books.services.dto.BookDto;
import org.springframework.data.domain.Page;

public interface IBookService {

    BookDto persist(BookDto book);

    BookDto getById(Long id);

    Page<BookDto> getAll(Integer page, Integer size);

    void delete(Long id);

}
