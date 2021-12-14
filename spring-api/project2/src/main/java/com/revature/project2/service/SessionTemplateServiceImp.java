package com.revature.project2.service;

import com.revature.project2.entities.SessionTemplate;
import com.revature.project2.repository.SessionTemplateRepository;
import com.revature.project2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionTemplateServiceImp implements SessionTemplateService {
    @Autowired
    private SessionTemplateRepository repository;

    @Override
    public SessionTemplate saveSessionTemplate(SessionTemplate sessionTemplate) {
        return repository.save(sessionTemplate);
    }

    @Override
    public SessionTemplate getSessionTemplateById(Long id) {
        return repository.getById(id);
    }

    @Override
    public List<SessionTemplate> getAllSessionTemplates() {
        return repository.findAll();
    }
}
