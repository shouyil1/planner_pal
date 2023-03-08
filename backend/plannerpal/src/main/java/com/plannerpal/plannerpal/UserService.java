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
public class UserService {
	
	//service to create a user document in the database
	public String createUser(User user) {
		
		try {
			//connect to firebase and use the deserialization to store the given User object in the database
			Firestore dbFirestore = FirestoreClient.getFirestore();
			ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("users").document(user.getName()).set(user);			
			return collectionsApiFuture.get().getUpdateTime().toString();
		} catch (InterruptedException e) {
			System.out.println("InterruptedException: " + e.getMessage());
		} catch (ExecutionException e) {
			System.out.println("Execution Exception: " + e.getMessage());
		} 
		return "";
	}
	
	//service to retrieve a user from the database
	//note that upon creation, the name of the user is the documentID
	public User getUser(String userId) {
		
		try {
			//connect to firebase and retrieve the document with the given userId
			Firestore dbFirestore = FirestoreClient.getFirestore();
			DocumentReference documentReference = dbFirestore.collection("users").document(userId);
			ApiFuture<DocumentSnapshot> future = documentReference.get();
			DocumentSnapshot document;
			document = future.get();
			
			//create a new user object, and serialize the document information into the object
			User crud = new User();
			if (document.exists()) {
				crud = document.toObject(User.class);
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
	public String updateUser(User user) {
		
		try {
			//connect to firebase and use the deserialization to store the User object in the database
			Firestore dbFirestore = FirestoreClient.getFirestore();
			ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("users").document(user.getName()).set(user);	
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
	public String deleteUser(String userId) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("users").document(userId).delete();
				
		return "Successfully deleted " + userId;
	}
}

