package com.revature.project2.controller;

import com.revature.project2.entities.SessionTemplate;
import com.revature.project2.service.SessionTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SessionTemplateController {
    @Autowired
    private SessionTemplateService service;

    @GetMapping("/session_templates")
    public List<SessionTemplate> getSessionTemplates(){
        return service.getAllSessionTemplates();
    }

    @PostMapping("/session_templates")
    public SessionTemplate saveSessionTemplate(@RequestBody SessionTemplate sessionTemplate){
        return service.saveSessionTemplate(sessionTemplate);
    }

    @GetMapping("/session_templates/{id}")
    public SessionTemplate getSessionTemplateById(@PathVariable Long id){
        return service.getSessionTemplateById(id);
    }
}
