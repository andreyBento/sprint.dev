package br.sprintdev.model.service;

import br.sprintdev.model.dao.EventDao;
import br.sprintdev.model.entity.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
public class EventServiceImpl implements EventService {

    @Autowired
    private EventDao dao;

    @Override
    public void create(Event event) {
        dao.save(event);
    }

    @Override
    public void update(Event event) {
        dao.update(event);
    }

    @Override
    public void delete(Long id) {
        dao.delete(id);
    }

    @Override
    public Event findById(Long id) {
        return dao.findById(id);
    }

    @Override
    public List<Event> findAll() {
        return dao.findAll();
    }

}
