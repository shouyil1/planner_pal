package com.plannerpal.plannerpal;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalendarController {
	public CalendarService calendarService;
	
	public CalendarController(CalendarService calServ) {
		calendarService = calServ;
	}
		
	//Calendar body should include userAccessList, with at least one (the creator)
	@PostMapping("/createCal")
	public String createCal(@RequestBody Calendar cal) {
		return calendarService.createCalendar(cal);
	}
	
	//http://localhost:9090/getUser?userId=NAME_HERE
	@GetMapping("/getCal")
	public Calendar getCal(@RequestParam String calId) {
		return calendarService.getCalendar(calId);
	}
	
	@PutMapping("/updateCal")
	public String updateCal(@RequestBody Calendar cal) {
		return calendarService.updateCalendar(cal);
	}
	
	@PutMapping("/deleteCal")
	public String deleteCal(@RequestParam String calId) {
		return calendarService.deleteCalendar(calId);
	}
	
	@GetMapping("/getAllCalendars")
	public List<Calendar> getAllCals(@RequestParam String userId) {
		return calendarService.getAllCalendars(userId);
	}
	
	@PutMapping("/shareCalendar")
	public String shareCalendar(@RequestParam String calId, @RequestParam String userId) {
		return calendarService.shareCalendar(calId, userId);
	}
}
