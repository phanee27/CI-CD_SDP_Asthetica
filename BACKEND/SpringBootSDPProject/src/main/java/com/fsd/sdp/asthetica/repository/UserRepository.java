package com.fsd.sdp.asthetica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsd.sdp.asthetica.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	public User findByUsernameAndPassword(String username, String password);
}
