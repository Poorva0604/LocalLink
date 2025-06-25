package com.localsevices.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import com.localsevices.backend.model.Service;
import com.localsevices.backend.model.User;
import com.localsevices.backend.repository.ServiceRepository;
import com.localsevices.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired private ServiceRepository serviceRepository;
    @Autowired private UserRepository userRepository;

    @DeleteMapping("service/{serviceId}")
    public ResponseEntity<String> DeleteService(@PathVariable long serviceId){
        if(!serviceRepository.existsById(serviceId)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service doesn't exist");
        }
        serviceRepository.deleteById(serviceId);
        return ResponseEntity.ok("Service deleted successfully");
    }

    @PostMapping("/add")
    public ResponseEntity<String> addService(@RequestBody Map<String, String> payload) {
        System.out.println("Recieved userId: "+payload.get("userId"));
        Long userId = Long.parseLong(payload.get("userId"));
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            Service service = new Service();
            service.setUser(user.get());
            service.setServiceName(payload.get("serviceName"));
            service.setDescription(payload.get("description"));
            service.setServiceprovider(payload.get("serviceprovider"));
            service.setLocation(payload.get("location"));
            service.setContact(Long.parseLong(payload.get("contact")));
            //service.setImageUrl(payload.get("imageUrl")); // or base64 or file link
            serviceRepository.save(service);
            return ResponseEntity.ok("Service added");
        }

        return ResponseEntity.badRequest().body("User not found");
    }

    @GetMapping("/search")
    public List<Service> searchServices(@RequestParam String serviceName, @RequestParam String location) {
        System.out.println("Inside /search"+serviceName+" "+location);
        return serviceRepository.searchServices(serviceName, location);
    }

    @GetMapping("/user/{userId}")
    public List<Service> getUserServices(@PathVariable Long userId) {
        return serviceRepository.findByUser_Id(userId);
    }

    @GetMapping("/getservicenames")
    public List<String> getServiceNames(){
        return serviceRepository.distictservices();
    }

    @GetMapping("/getlocations")
    public List<String> getLocations(){
        return serviceRepository.distictlocations();
    }
}

