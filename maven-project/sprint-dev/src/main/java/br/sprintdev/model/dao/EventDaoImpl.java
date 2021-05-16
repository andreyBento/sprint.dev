package br.sprintdev.model.dao;

import br.sprintdev.model.entity.Event;
import org.springframework.stereotype.Repository;

@Repository
public class EventDaoImpl extends AbstractDao<Event, Long> implements EventDao {
}
