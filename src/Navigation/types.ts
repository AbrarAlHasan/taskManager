export type MainStackParamList = {
  Dashboard: undefined;
  ProjectDetails: TProjectDetailsParams;
  TaskDetails: TTaskDetailsParams;
  AddTask: undefined;
  AddTaskN: undefined;
  BottomBar: undefined;
  AddProject: undefined;
  ProjectTasks: {projectId: string; projectName: string};
  StartUp: undefined;
  AuthStack: undefined;
  MembersList: {projectId: string; projectName: string};
  AddMember: {projectId: string; projectName: string};
};

export type TProjectDetailsParams = {
  projectId: string;
  projectName: string;
};

export type TTaskDetailsParams = {
  taskId: string;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPass: undefined;
  ResetPass: undefined;
  OTP: {pageType: string};
  StartUp: undefined;
};
