package com.revature.project2.service;

import com.revature.project2.entities.SegmentTemplate;
import com.revature.project2.entities.SessionTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SegmentTemplateService {
    SegmentTemplate saveSegmentTemplate(SegmentTemplate segmentTemplate);
    List<SegmentTemplate> saveListOfSegmentTemplate(List<SegmentTemplate> segmentTemplates);
    SegmentTemplate getSegmentTemplateById(Long id);
    List<SegmentTemplate> getAllSegmentTemplates();
    List<SegmentTemplate> getSegmentTemplatesBySession(SessionTemplate sessionTemplate);
}
