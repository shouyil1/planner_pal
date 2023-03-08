package com.plannerpal.plannerpal;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public abstract class Task {
	private String taskName;
	private String description;
	private String taskType;
	private String documentId;

}
