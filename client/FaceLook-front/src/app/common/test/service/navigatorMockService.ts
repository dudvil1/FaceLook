import { INavigatorService } from '../../service/navigator.service';

export class NavigatorMockService implements INavigatorService {

  constructor() { }

  goToRegister = () => { }
  goToLogin = () => { }
  goToHomePage = () => { }
  goToFriendsPage = () => { }
  goToSharePostPage = () => { }
  goToPostsPage = () => { }
}
