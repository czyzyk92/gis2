/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.gis2.repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.mycompany.gis2.domain.Administratorzy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Wojtek
 */
@Transactional
public interface AdministratorzyRepository extends JpaRepository<Administratorzy,Long>, JpaSpecificationExecutor<Administratorzy>{
    
    Administratorzy findOneByLogin(String login);
}
