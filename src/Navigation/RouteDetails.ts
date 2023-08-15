import AddTask from '../Screens/AddTask';
import Dashboard from '../Screens/Dashboard';
import TaskList from '../Screens/TaskList';
import HomeIcon from '../Assets/HomeIcon.svg';
import TaskIcon from '../Assets/TaskIcon.svg';
import AddTaskIcon from '../Assets/AddIcon.svg';
import MessageIcon from '../Assets/MessageIcon.svg';
import ProfileIcon from '../Assets/ProfileIcon.svg';
import Messaging from '../Screens/Messaging';
import Profile from '../Screens/Profile';

export const bottomTabRoutes = [
  {
    title: 'Dashboard',
    component: Dashboard,
    routeName: 'Dashboard',
    icon: HomeIcon,
  },
  {
    title: 'TaskList',
    component: TaskList,
    routeName: 'TaskList',
    icon: TaskIcon,
  },
  {
    title: 'AddTask',
    component: AddTask,
    routeName: 'AddTask',
    icon: AddTaskIcon,
  },
  {
    title: 'Messaging',
    component: Messaging,
    routeName: 'Messaging',
    icon: MessageIcon,
  },
  {
    title: 'Profile',
    component: Profile,
    routeName: 'Profile',
    icon: ProfileIcon,
  },
];
