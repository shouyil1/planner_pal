package com.plannerpal.plannerpal;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class CalendarTask extends Task {
	private String calendar; //documentId of the calendar it belongs to
	//use ISO 8601 for date format
	private String startTime; //start time and date
	private String endTime; //end time and date
	
	//set taskType to 'CALENDAR'
}
