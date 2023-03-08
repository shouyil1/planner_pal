package com.plannerpal.plannerpal;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TodoTask extends Task {
	private boolean completed;
	//set taskType to 'TODO'
}
