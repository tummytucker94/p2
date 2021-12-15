package com.revature.project2.service;

import com.revature.project2.entities.SegmentTemplate;
import com.revature.project2.entities.SessionTemplate;
import com.revature.project2.repository.SegmentTemplateRepository;
import com.revature.project2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SegmentTemplateServiceImp implements SegmentTemplateService{
    @Autowired
    private SegmentTemplateRepository repository;

    @Override
    public SegmentTemplate saveSegmentTemplate(SegmentTemplate segmentTemplate) {
        return repository.save(segmentTemplate);
    }

    @Override
    public List<SegmentTemplate> saveListOfSegmentTemplate(List<SegmentTemplate> segmentTemplates) {
        List<SegmentTemplate> segments = new ArrayList<>();
        for (SegmentTemplate segmentTemplate : segmentTemplates) {
            segments.add(repository.save(segmentTemplate));
        }
        return segments;
    }

    @Override
    public SegmentTemplate getSegmentTemplateById(Long id) {
        return repository.getById(id);
    }

    @Override
    public List<SegmentTemplate> getAllSegmentTemplates() {
        return repository.findAll();
    }



    @Override
    public List<SegmentTemplate> getSegmentTemplatesBySession(SessionTemplate sessionTemplate) {
        return repository.findAllBySessionTemplateOrderBySegmentPosition(sessionTemplate);
    }

    @Override
    public List<SegmentTemplate> getAllOrderByPosition() {
        return repository.findAllByOrderBySegmentPositionAsc();
    }
}
