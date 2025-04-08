package com.fsd.sdp.asthetica.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.UserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
	@Autowired
	private UserService service;
	
	@PostMapping("/adduser")
	public String adduser(@RequestBody User user) {
		return service.adduser(user);
	}
	
}
