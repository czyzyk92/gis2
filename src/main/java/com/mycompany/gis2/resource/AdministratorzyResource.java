/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.gis2.resource;

import com.mycompany.gis2.domain.Administratorzy;
import com.mycompany.gis2.repository.AdministratorzyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author SzeN
 */
@Transactional
@RestController
public class AdministratorzyResource {
    
    @Autowired
    private AdministratorzyRepository adminRepository;
    
    @RequestMapping(value = "/admin",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity isCorrect(@RequestBody Administratorzy admin) {
        Administratorzy adminRep = adminRepository.findOneByLogin(admin.getLogin());
        
        return (admin.getHaslo().equals(adminRep.getHaslo())) ? new ResponseEntity(HttpStatus.OK) : new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }
}
