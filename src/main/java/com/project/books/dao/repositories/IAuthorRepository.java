package com.project.books.dao.repositories;

import com.project.books.dao.entities.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAuthorRepository extends JpaRepository<AuthorEntity, Long> { }
