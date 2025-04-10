package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.enumeration.Role;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository repository;
	
	@Override
	public String adduser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		repository.save(user);
		return "User Registered Successfully";
	}

	@Override
	public User checkuserlogin(String username, String password) {
		User user = repository.findByUsername(username);
		if(user != null && passwordEncoder.matches(password, user.getPassword())) {
			return user;
		}
		return null;
	}

	@Override
	public List<User> displayusers() {
		List<User> users = repository.findAll();
		List<User> filteredUsers = users.stream()
			 							.filter(user -> user.getRole().equals(Role.BUYER) || user.getRole().equals(Role.SELLER))
			 							.collect(Collectors.toList());
		
		return filteredUsers;
	}

	@Override
	public String deleteuser(int cid) {
		Optional<User> user=repository.findById(cid);
		if(user.isPresent()) {
			repository.deleteById(cid);
			return "User Deleted Successfully";
		}else {
			return "User Id Not Found";
		}
		
	}

	@Override
	public User getprofile(String username) {
		User user = repository.findByUsername(username);
		return user;
	}

	@Override
	public User updateProfile(User user) {
		User u = repository.findByUsername(user.getUsername());
		if(u != null) {
			u.setName(user.getName());
	        u.setEmail(user.getEmail());
	        u.setContact(user.getContact());
			return repository.save(u);
		}
		return null;
	}
	
	
}
