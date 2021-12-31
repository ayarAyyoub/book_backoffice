package com.project.books.dao.repositories;

import com.project.books.dao.entities.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookRepository extends JpaRepository<BookEntity, Long> { }
