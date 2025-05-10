package com.fsd.sdp.asthetica.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.ArtworkService;
import com.fsd.sdp.asthetica.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
	@Autowired
	private UserService service;
	
	@Autowired
	private ArtworkService artworkService;
	
	@GetMapping("/viewallusers")
	public ResponseEntity<List<User>> viewallusers(){
		List<User> users=service.displayusers();
		return ResponseEntity.ok(users);
	}
	
	@DeleteMapping("/deleteuser")
	public ResponseEntity<String> deleteuser(@RequestParam int cid){
		try {
			String output=service.deleteuser(cid);
			return ResponseEntity.ok(output);
		}catch(Exception e) {
			return ResponseEntity.status(500).body("Failed to Delete User!");
		}
	}
	
	@GetMapping("/sellerRequests")
    public List<User> getAllSellerRequests() {
        return service.displayallsellerrequest();
    }
	
	@PutMapping("/approveSeller/{id}")
    public ResponseEntity<String> approveSeller(@PathVariable int id) {
        String result = service.approveseller(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/rejectSeller/{id}")
    public ResponseEntity<String> rejectSeller(@PathVariable int id) {
        String result = service.rejectseller(id);
        return ResponseEntity.ok(result);
    }
    
    @PutMapping("/removeseller/{id}")
    public ResponseEntity<String> removeSeller(@PathVariable int id) {
        try {
            String result = service.removeseller(id);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    
    @GetMapping("/buyercount")
    public long getBuyerCount() {
        return service.displaybuyercount();
    }

    @GetMapping("/sellercount")
    public long getSellerCount() {
        return service.displaysellercount();
    }
    
    @GetMapping("/artworkcount")
    public long getArtworkCount() {
    	return artworkService.displayartworkcount();
    }



}
