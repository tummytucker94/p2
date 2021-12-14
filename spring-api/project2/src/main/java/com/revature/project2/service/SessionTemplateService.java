package com.revature.project2.service;

import com.revature.project2.entities.SessionTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SessionTemplateService {
    SessionTemplate saveSessionTemplate(SessionTemplate sessionTemplate);
    SessionTemplate getSessionTemplateById(Long id);
    List<SessionTemplate> getAllSessionTemplates();
}
