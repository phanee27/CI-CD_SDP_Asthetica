package com.fsd.sdp.asthetica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
	@Autowired
	private UserService service;
	
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

}
