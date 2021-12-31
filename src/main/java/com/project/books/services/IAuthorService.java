package com.project.books.services;

import com.project.books.services.dto.AuthorDto;
import org.springframework.data.domain.Page;

public interface IAuthorService {

    AuthorDto persist(AuthorDto author);

    AuthorDto getById(Long id);

    Page<AuthorDto> getAll(Integer page, Integer size);

    void delete(Long id);

}
