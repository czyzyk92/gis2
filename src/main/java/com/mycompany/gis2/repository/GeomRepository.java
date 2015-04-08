/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.gis2.repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.mycompany.gis2.domain.Geom;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Wojtek
 */
public interface GeomRepository extends JpaRepository<Geom,Long>, JpaSpecificationExecutor<Geom>{
    
}
