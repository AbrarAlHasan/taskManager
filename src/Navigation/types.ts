export type MainStackParamList = {
  Dashboard: undefined;
  ProjectDetails: TProjectDetailsParams;
  TaskDetails: TTaskDetailsParams;
  AddTask: undefined;
  AddTaskN: undefined;
  BottomBar: undefined;
};

export type TProjectDetailsParams = {
  projectId: string;
  projectName: string;
};

export type TTaskDetailsParams = {
  taskId: string;
};
