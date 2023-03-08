package com.plannerpal.plannerpal;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Calendar {
	private String calendarName;
	private String userId;
	private boolean google;
	private List<String> userAccessList; //list of documentId for each user ( = user's name)
	private String documentId;
	private List<String> eventList; //list of documentId for each events in the calendar
	
	public static final String REMOVE_CREATOR = "Cannot remove owner of the calendar";
	public static final String DNE = "User/Event does not exist in event/access list";
	public static final String COMPLETE = "completed successfully";
	
	public String addUser(String newUserId) {
		if (userAccessList == null) {
			userAccessList = new ArrayList<String>();
		}
		
		if (userAccessList.indexOf(newUserId) >= 0) {
			System.out.println("user already exists in calendar");
			return "user already exists in calendar";
		} 
		userAccessList.add(newUserId);
		return COMPLETE;
	}
	
	public String removeUser(String newUserId) {
		if (newUserId.equals(userId)) {
			System.out.println("can't remove the creator");
			return REMOVE_CREATOR;
		} 
		
		int idx = userAccessList.indexOf(newUserId);
		if (idx < 0) {
			System.out.println("user doesn't exist to be removed");
			return DNE;
		}
		userAccessList.remove(idx);
		return COMPLETE;
	}
	
	public String addEvent(String taskId) {
		if (eventList == null) {
			eventList = new ArrayList<String>();
		}
		
		if (eventList.indexOf(taskId) >= 0) {
			System.out.println("event already exists in calendar");
			return "event already exists in calendar";
		} 
		eventList.add(taskId);
		return COMPLETE;
	}
	
	public String removeEvent(String taskId) {
		
		int idx = eventList.indexOf(taskId);
		if (idx < 0) {
			System.out.println("event doesn't exist to be removed");
			return DNE;
		}
		eventList.remove(idx);
		return COMPLETE;
	} 
	
}
