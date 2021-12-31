package com.project.books.dao.repositories;

import com.project.books.dao.entities.AuthorEntity;
import com.project.books.dao.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long> { }
