package com.fsd.sdp.asthetica.service;


import com.fsd.sdp.asthetica.model.User;


public interface UserService {
	public String adduser(User user);
	public User checkuserlogin(String username, String password);
}
