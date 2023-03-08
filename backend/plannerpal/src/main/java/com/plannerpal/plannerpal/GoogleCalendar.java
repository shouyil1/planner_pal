package com.plannerpal.plannerpal;

import com.chilkatsoft.*;

public class GoogleCalendar {
    public static final int TODO = 0;
    public TaskService taskService;

    static {
        try {
            System.loadLibrary("chilkat");
        } catch (UnsatisfiedLinkError e) {
            System.err.println("Native code library failed to load.\n" + e);
            System.exit(1);
        }
    }
    
    public void syncGoogleCalendar(String userId, String oauthToken, String googleAccount) {
        CkRest rest = new CkRest();
        boolean success;

        CkOAuth2 oauth2 = new CkOAuth2();
        oauth2.put_AccessToken(oauthToken);   // Provide a previously obtained OAuth2 access token.
        rest.SetAuthOAuth2(oauth2);

        success = rest.Connect("www.googleapis.com",443,true,true);
        if (success != true) {
            System.out.println(rest.lastErrorText());
            return;
        }

        CkStringBuilder sbJson = new CkStringBuilder();
        success = rest.FullRequestNoBodySb("GET","/calendar/v3/calendars/" + googleAccount + "/events",sbJson);
        if (success != true) {
            System.out.println(rest.lastErrorText());
            return;
        }

        if (rest.get_ResponseStatusCode() != 200) {
            System.out.println("Received error response code: " + rest.get_ResponseStatusCode());
            System.out.println("Response body:");
            System.out.println(sbJson.getAsString());
            return;
        }

        CkJsonObject json = new CkJsonObject();
        json.LoadSb(sbJson);

        //  The following code parses the JSON response.
        //  A sample JSON response is shown below the sample code.
        String kind;
        String etag;
        String summary;
        String description;
        String updated;
        String timeZone;
        String accessRole;
        String nextSyncToken;
        int i;
        int count_i;
        String method;
        int minutes;
        String id;
        String status;
        String htmlLink;
        String created;
        String creatorEmail;
        boolean creatorSelf;
        String organizerEmail;
        boolean organizerSelf;
        String startDateTime;
        String endDateTime;
        String iCalUID;
        int sequence;
        String hangoutLink;
        boolean remindersUseDefault;
        String location;

        kind = json.stringOf("kind");
        etag = json.stringOf("etag");
        summary = json.stringOf("summary");
        updated = json.stringOf("updated");
        timeZone = json.stringOf("timeZone");
        accessRole = json.stringOf("accessRole");
        nextSyncToken = json.stringOf("nextSyncToken");
        i = 0;
        count_i = json.SizeOfArray("defaultReminders");
        while (i < count_i) {
            json.put_I(i);
            method = json.stringOf("defaultReminders[i].method");
            minutes = json.IntOf("defaultReminders[i].minutes");
            i = i+1;
        }

        i = 0;
        count_i = json.SizeOfArray("items");
        while (i < count_i) {
            json.put_I(i);
            kind = json.stringOf("items[i].kind");
            etag = json.stringOf("items[i].etag");
            id = json.stringOf("items[i].id");
            status = json.stringOf("items[i].status");
            htmlLink = json.stringOf("items[i].htmlLink");
            created = json.stringOf("items[i].created");
            updated = json.stringOf("items[i].updated");
            summary = json.stringOf("items[i].summary");
            description = json.stringOf("items[i].description");
            creatorEmail = json.stringOf("items[i].creator.email");
            creatorSelf = json.BoolOf("items[i].creator.self");
            organizerEmail = json.stringOf("items[i].organizer.email");
            organizerSelf = json.BoolOf("items[i].organizer.self");
            startDateTime = json.stringOf("items[i].start.dateTime");
            endDateTime = json.stringOf("items[i].end.dateTime");
            iCalUID = json.stringOf("items[i].iCalUID");
            sequence = json.IntOf("items[i].sequence");
            hangoutLink = json.stringOf("items[i].hangoutLink");
            remindersUseDefault = json.BoolOf("items[i].reminders.useDefault");
            location = json.stringOf("items[i].location");
            i = i+1;


            String taskName = summary;
            String des = description;
            String taskType = kind;
            String documentId = id;

            TodoTask task = new TodoTask();
            task.setDescription(des);
            task.setTaskName(taskName);
            task.setTaskType(taskType);
            task.setDocumentId(documentId);
            String buf = taskService.createTask(userId, task, taskService.TODO);
        }

    }
}
