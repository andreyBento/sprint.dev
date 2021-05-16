package br.sprintdev.model.dao;

import br.sprintdev.model.entity.Event;

import java.util.List;

public interface EventDao {

    void save(Event event);

    void update(Event event);

    void delete(Long id);

    Event findById(Long id);

    List<Event> findAll();

}
