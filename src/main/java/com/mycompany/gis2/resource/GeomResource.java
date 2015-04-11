
package com.mycompany.gis2.resource;

import com.mycompany.gis2.domain.Geom;
import com.mycompany.gis2.repository.GeomRepository;
import java.util.Optional;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import static org.springframework.data.jpa.domain.Specifications.where;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Wojtek
 */
@Transactional
@RestController
@RequestMapping("/api")
public class GeomResource {
    @Inject
    private EntityManager em;
    
    @Inject
    private GeomRepository geomRepository;
    
    
    @RequestMapping(value = "/geom/{id}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Geom get(@PathVariable int id){
        
        return geomRepository.findOne(id);
                
    }
    
    
    * GET /inbox/:id
     */
    @RequestMapping(value = "/inbox/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    
    public Inbox get(@PathVariable Long id) {
        return inboxRepository.findOne(id);
    }
    
}
