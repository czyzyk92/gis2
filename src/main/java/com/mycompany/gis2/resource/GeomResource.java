
package com.mycompany.gis2.resource;

import com.mycompany.gis2.domain.Geom;
import com.mycompany.gis2.repository.GeomRepository;
import java.util.List;
import javax.inject.Inject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
@RequestMapping("/")
public class GeomResource {
    
    @Autowired
    private GeomRepository geomRepository;
    
    
    @RequestMapping(value = "/geom/{id}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Geom get(@PathVariable Long id){
        
        return geomRepository.findOne(id);
                
    }
    
    
    @RequestMapping(value = "/geom",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    
    public List<Geom> get() {
        return geomRepository.findAll();
    }
    
}
