package com.fsd.sdp.asthetica.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	@PostMapping("/checkuserlogin")
	public ResponseEntity<?> checkuserlogin(@RequestBody User user){
		User u = service.checkuserlogin(user.getUsername(), user.getPassword());
		if(u != null) {
			return ResponseEntity.ok(u);
		}else {
			return ResponseEntity.status(401).body("Invalid Credentials");
		}
	}
	
	@PostMapping("/adduser")
	public String adduser(@RequestBody User user) {
		return service.adduser(user);
	}
	
	
}
