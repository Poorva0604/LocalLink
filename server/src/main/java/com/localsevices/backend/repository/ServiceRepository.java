package com.localsevices.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.localsevices.backend.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    @Query("SELECT s FROM Service s WHERE LOWER(s.serviceName) LIKE LOWER(CONCAT('%', :serviceName, '%')) AND LOWER(s.location) LIKE LOWER(CONCAT('%', :location, '%'))")
    List<Service> searchServices(@Param("serviceName") String serviceName, @Param("location") String location);
    List<Service> findByUser_Id(Long userId);

     @Query("SELECT DISTINCT s.serviceName FROM Service s")  
    List<String> distictservices();

    @Query("SELECT DISTINCT s.location FROM Service s")
    List<String> distictlocations();
}
//@Query("SELECT s FROM Service s WHERE LOWER(s.serviceName) LIKE LOWER(CONCAT('%', :serviceName, '%')) AND LOWER(s.location) LIKE LOWER(CONCAT('%', :location, '%'))")
// List<Service> findByServiceNameContainingIgnoreCaseAndLocationContainingIgnoreCase(String serviceName, String location);
