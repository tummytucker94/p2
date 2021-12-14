package com.revature.project2.repository;

import com.revature.project2.entities.SessionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionTemplateRepository extends JpaRepository<SessionTemplate, Long> {

}
