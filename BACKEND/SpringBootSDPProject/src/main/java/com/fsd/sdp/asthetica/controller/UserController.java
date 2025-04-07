package com.fsd.sdp.asthetica.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService service;
	@GetMapping("/")
	public String home() {
		return "user home";
	}
	
	@PostMapping("/checkuserlogin")
	public ResponseEntity<?> checkuserlogin(@RequestBody User user){
//	    System.out.println("Login Attempt: " + user.getUsername() + ", " + user.getPassword());
	    User u = service.checkuserlogin(user.getUsername(), user.getPassword());
	    try {
	    if(u != null) {
	        return ResponseEntity.ok(u);
	    } else {
	        System.out.println("Login Failed");
	        return ResponseEntity.status(401).body("Invalid Credentials");
	    }
	    }catch(Exception e) {
	    	return ResponseEntity.status(500).body("Login Failed"+e.getMessage());
	    }
	}

	
	@PostMapping("/adduser")
	public String adduser(@RequestBody User user) {
		return service.adduser(user);
	}
	
	
}
