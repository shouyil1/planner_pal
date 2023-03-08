package com.plannerpal.plannerpal;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class CalendarService {
	//service to create a user document in the database
		public UserService userService = new UserService();
		
		public String createCalendar(Calendar calendar) {
			
			try {
				//connect to firebase and use the deserialization to store the given User object in the database
				
				Firestore dbFirestore = FirestoreClient.getFirestore();
				ApiFuture<DocumentReference> docRef = dbFirestore.collection("calendars").add(calendar);
				String calendarId = docRef.get().getId();
				calendar.setDocumentId(calendarId);
				updateCalendar(calendar);
				
				return "added calendar with id " + docRef.get().getId();
			} catch (InterruptedException e) {
				System.out.println("InterruptedException: " + e.getMessage());
			} catch (ExecutionException e) {
				System.out.println("Execution Exception: " + e.getMessage());
			} 
			return "";
		}
		
		//service to retrieve a user from the database
		//note that upon creation, the name of the user is the documentID
		public Calendar getCalendar(String calendarId) {
			
			try {
				//connect to firebase and retrieve the document with the given userId
				Firestore dbFirestore = FirestoreClient.getFirestore();
				DocumentReference documentReference = dbFirestore.collection("calendars").document(calendarId);
				ApiFuture<DocumentSnapshot> future = documentReference.get();
				DocumentSnapshot document;
				document = future.get();
				
				//create a new user object, and serialize the document information into the object
				Calendar crud = new Calendar();
				if (document.exists()) {
					crud = document.toObject(Calendar.class);
					return crud;
				} else {
					return null;
				}
			} catch (InterruptedException e) {
				System.out.println("InterruptedException: " + e.getMessage());
			} catch (ExecutionException e) {
				System.out.println("ExecutionException: " + e.getMessage());
			}
			return null;
		}
		
		//service to update the given user's document
		public String updateCalendar(Calendar calendar) {
			
			try {
				//connect to firebase and use the deserialization to store the User object in the database
				Firestore dbFirestore = FirestoreClient.getFirestore();
				ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("calendars").document(calendar.getDocumentId()).set(calendar);	
				List<String> userAccess = calendar.getUserAccessList();
				for (String userId : userAccess) {
					User user = userService.getUser(userId);
					user.addCalendar(calendar.getDocumentId());
					userService.updateUser(user);
				}
				return collectionsApiFuture.get().getUpdateTime().toString();
			} catch (InterruptedException e) {
				System.out.println("InterruptedException: " + e.getMessage());
			} catch (ExecutionException e) {
				System.out.println("Execution Exception: " + e.getMessage());
			} 
			return "";
		}
		
		//note that upon creation, the name  of the user is the documentID
		//service to remove a user from the database (to be used for guest sessions)
		public String deleteCalendar(String calendarId) {
			Firestore dbFirestore = FirestoreClient.getFirestore();
			
			Calendar calendar = getCalendar(calendarId);
			List<String> userAccess = calendar.getUserAccessList();
			for (String userId : userAccess) {
				User user = userService.getUser(userId);
				user.removeCalendar(calendar.getDocumentId());
				userService.updateUser(user);
			}
						
			ApiFuture<WriteResult> writeResult = dbFirestore.collection("calendars").document(calendarId).delete();
			return "Successfully deleted " + calendarId;
		}
		
		public List<Calendar> getAllCalendars(String userId) {
			List<Calendar> cals = new ArrayList<Calendar>();
			User user = userService.getUser(userId);
			List<String> calIds = user.getCalendarList();
			
			for (String calId : calIds) {
				cals.add(getCalendar(calId));
			}
			
			return cals;
		}
		
		public String shareCalendar(String calId, String userId) {
			Calendar calendar = getCalendar(calId);
			calendar.addUser(userId);
			updateCalendar(calendar);
			
			User user = userService.getUser(userId);
			user.addCalendar(calId);
			userService.updateUser(user);
			
			return "added " + calId + " for user " + userId;
		}
}
