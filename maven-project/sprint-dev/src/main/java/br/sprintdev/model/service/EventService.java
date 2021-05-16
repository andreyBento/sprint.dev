package br.sprintdev.model.service;

import br.sprintdev.model.entity.Event;

import java.util.List;

public interface EventService {

    void create(Event box);

    void update(Event box);

    void delete(Long id);

    Event findById(Long id);

    List<Event> findAll();
}
