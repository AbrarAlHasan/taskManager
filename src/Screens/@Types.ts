export interface IProjectListType {
  _id: string;
  userId: string;
  role: string;
  projectDetails: IProjectDetails;
  userDetails: IUserDetails;
  totalTasks: number;
  completedTasks: number;
}

export interface IUserDetails {
  _id: string;
  name: string;
  email: string;
  password: string;
  isVerified: true;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface IProjectDetails {
  _id: string;
  name: string;
  description: string;
  createdBy: IUserDetails;
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
}

export interface ITaskDetails {
  _id: string;
  projectId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: IUserDetails;
  priority: string;
  tags: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  __v: Number;
}
export interface IProjectMembers {
  _id: string;
  role: string;
  name: string;
}
export interface IProjectDetailedDetails {
  __v: number;
  _id: string;
  completedTasks: number;
  createdAt: string;
  createdBy: string;
  description: string;
  name: string;
  totalMembers: number;
  totalTasks: number;
  updatedAt: string;
  pendingTasks: string;
}

export interface IProjectMembersList extends IProjectMembers {
  userId: IUserDetails;
}

export interface IAccessControl {
  __v: 0;
  _id: String;
  createdAt: String;
  deleteAccess: 0 | 1;
  memberId: String;
  moduleId: String;
  readAccess: 0 | 1;
  updateAccess: 0 | 1;
  updatedAt: String;
  writeAccess: 0 | 1;
}

export interface IAccessObject {
  readAccess: 0 | 1;
  updateAccess: 0 | 1;
  writeAccess: 0 | 1;
  deleteAccess: 0 | 1;
}

export interface ITaskHistory {
  _id:string,
  taskId:string,
  createdBy:{name:string,_id:string,email:string},
  createdAt:Date,
  description:string
}
