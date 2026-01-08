export const getTaskColorClass = (projectPriority: string) => {
  let taskPriorityColor: string = "";
  if (projectPriority === "low") {
    taskPriorityColor = "bg-green-600";
  } else if (projectPriority === "medium") {
    taskPriorityColor = "bg-yellow-600";
  } else if (projectPriority === "high") {
    taskPriorityColor = "bg-red-600";
  }

  return taskPriorityColor;
};

export const getStatusColumnClass = (statusColumn: string) => {
  let statusColumnClass: string = "";
  if (statusColumn === "todo") {
    statusColumnClass = "bg-yellow-400";
  } else if (statusColumn === "in_progress") {
    statusColumnClass = "bg-blue-500";
  } else if (statusColumn === "done") {
    statusColumnClass = "bg-green-300";
  }

  return statusColumnClass;
};

export const capitalizeFirstLetter = (priority: string) => {
  if (!priority) return priority;

  const firstLetter = priority.charAt(0).toUpperCase();
  const restOfString = priority.slice(1);
  return firstLetter + restOfString;
};

export const getInitials = (fullName: string) => {
  if (!fullName) return "";

  const nameParts = fullName.split(" ").filter((part) => part.length > 0);
  let initials = nameParts[0][0];

  if (nameParts.length > 1) {
    initials += nameParts[1][0];
  }

  return initials.toUpperCase();
};
