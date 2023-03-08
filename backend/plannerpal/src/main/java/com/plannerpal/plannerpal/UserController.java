package com.plannerpal.plannerpal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	public UserService userService;
	
	public UserController(UserService userServ) {
		userService = userServ;
	}
		
	@PostMapping("/createUser")
	public String createUser(@RequestBody User user) {
		return userService.createUser(user);
	}
	
	//http://localhost:9090/getUser?userId=NAME_HERE
	@GetMapping("/getUser")
	public User getUser(@RequestParam String userId) {
		return userService.getUser(userId);
	}
	
	@PutMapping("/updateUser")
	public String updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}
	
	@PutMapping("/deleteUser")
	public String deleteUser(@RequestParam String userId) {
		return userService.deleteUser(userId);
	}
	
	@GetMapping("/test")
	public ResponseEntity<String> hello() {
		return ResponseEntity.ok("Test Get endpoint working");
	}
	
}

