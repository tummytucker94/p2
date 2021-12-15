package com.revature.project2.repository;

import com.revature.project2.entities.SegmentTemplate;
import com.revature.project2.entities.SessionTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SegmentTemplateRepository extends JpaRepository<SegmentTemplate, Long> {
    List<SegmentTemplate> findAllBySessionTemplateOrderBySegmentPosition(SessionTemplate sessionTemplate);
    List<SegmentTemplate> findAllByOrderBySegmentPositionAsc();
}
