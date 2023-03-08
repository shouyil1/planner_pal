package com.plannerpal.plannerpal;

import java.util.ArrayList;
import java.util.List;

import com.google.firebase.database.Exclude;
import com.google.firebase.database.IgnoreExtraProperties;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class User {
//	private String documentId;
	private String name;
	private boolean hasGoogle;
	private String email;
	private String currentCharacter; //string of character's id
	private List<String> calendarList; //list of documentId for each calendar
	private List<String> toDoList; //list list of documentId for each todoTask

	public String addToDo(String taskId) {
		if (toDoList == null) {
			toDoList = new ArrayList<String>();
		}
		int idx = toDoList.indexOf(taskId);
		if (idx >= 0) {
			System.out.println("todo already exists for this user");
			return "todo already exists for this user";
		} 
		toDoList.add(taskId);
		return "complete";
	}
	
	public String removeTodo(String taskId) {
		int idx = toDoList.indexOf(taskId);
		if (idx < 0) {
			System.out.println("todo doesn't exist to be removed");
			return "todo doesn't exist to be removed";
		}
		toDoList.remove(idx);
		return "complete";
	}
	
	public String removeCalendar(String calId) {
		int idx = calendarList.indexOf(calId);
		if (idx < 0) {
			System.out.println("calendar doesn't exist to be removed");
			return "calendar doesn't exist to be removed";
		}
		calendarList.remove(idx);
		return "complete";
	}
	
	public String  addCalendar(String calendarId) {
		if (calendarList == null) {
			calendarList = new ArrayList<String>();
		}
		int idx = calendarList.indexOf(calendarId);
		if (idx >= 0) {
			System.out.println("calendar already exists for this user");
			return "calendar already exists for this user";
		} 
		calendarList.add(calendarId);
		return "complete";
	}
}