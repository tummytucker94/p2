package com.revature.project2.controller;

import com.revature.project2.entities.SegmentTemplate;
import com.revature.project2.entities.SessionTemplate;
import com.revature.project2.service.SegmentTemplateService;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SegmentTemplateController {
    @Autowired
    private SegmentTemplateService service;

    @GetMapping("/segment_templates")
    public List<SegmentTemplate> getSegmentTemplates(){
        return service.getAllOrderByPosition();
    }

    @PostMapping("/segment_templates")
    public SegmentTemplate saveSegmentTemplate(@RequestBody SegmentTemplate segmentTemplate){
        return service.saveSegmentTemplate(segmentTemplate);
    }

    @GetMapping("/segment_templates/session")
    public List<SegmentTemplate> getSegmentsBySession(@RequestBody SessionTemplate sessionTemplate){
        return service.getSegmentTemplatesBySession(sessionTemplate);
    }
}
