package com.plannerpal.plannerpal;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;


@SpringBootApplication
public class CRUDRunner {

	public static void main(String[] args) {
		ClassLoader classLoader = CRUDRunner.class.getClassLoader();
		
		File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
		try {
			
			//following code is for eclipse, comment when deployed and uncomment below
			FileInputStream serviceAccount =
					  new FileInputStream(file.getAbsolutePath());
			FirebaseOptions options = new FirebaseOptions.Builder()
					  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
					  .build();

			if ( FirebaseApp.getApps().size() == 0 ) {
				FirebaseApp.initializeApp(options);
			}
			FirebaseApp.initializeApp(options);

			
			//***NEED TO SET ENV VARIABLE BEFORE RUNNING on GCP
			//Requirements for running in GCP
				//export GOOGLE_APPLICATION_CREDENTIALS="/home/anpalaparthi/cs201_final_project/backend/plannerpal/serviceAccountKey.json"
				//serviceAccountKey.Json needs to be moved to the higher level folder /plannerpal/serviceAccountKey.json (same level as src)
			
			
			//uncomment these lines from running on GCP Cloud VM
//			FirebaseOptions options = FirebaseOptions.builder()
//				    .setCredentials(GoogleCredentials.getApplicationDefault())
//				    .setDatabaseUrl("https://planner-pal-db.firebaseio.com/")
//				    .build();
//
//			FirebaseApp.initializeApp(options);
			
			SpringApplication.run(CRUDRunner.class, args);

		} catch (FileNotFoundException e) {
			System.out.println("File Not Found in firebase init: " + e.getMessage());
		} catch (IOException ioe) {
			System.out.println("ioexception in firebase init: " + ioe.getMessage());
		}
					
	}

}
