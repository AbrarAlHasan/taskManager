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
