import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavigatorService } from './navigator.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Routes, Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { allComponents } from '../test/components'
import { routes } from '../../../app/app-routing.module';
import { Location } from '@angular/common';

const mockRoutes = routes.map(route => {
    return {
        ...route,
        component: setComponent(route, allComponents),
        data: undefined,
        canActivate: undefined
    }
})

describe('NavigatorService', () => {
    let service: NavigatorService;
    let location: Location
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ...allComponents
            ],
            imports: [
                RouterTestingModule.withRoutes(mockRoutes),
            ],
            providers: [
                NavigatorService,
                { provide: ActivatedRouteSnapshot, useValue: { data: {} } },
                { provide: RouterStateSnapshot, useValue: {} },
            ]
        });
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        service = TestBed.inject(NavigatorService);
        router.initialNavigation();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it("goToRegister() nevigate to '/register'", fakeAsync(() => {
        service.goToRegister()
        tick()
        expect(location.path()).toEqual('/register')
    }));

    it("goToLogin() nevigate to '/login'", fakeAsync(() => {
        service.goToLogin()
        tick()
        expect(location.path()).toEqual('/login')
    }));

    it("goToHomePage() nevigate to '/social'", fakeAsync(() => {
        service.goToHomePage()
        tick()
        expect(location.path()).toEqual('/social')
    }));

    it("goToFriendsPage() nevigate to '/friends'", fakeAsync(() => {
        service.goToFriendsPage()
        tick()
        expect(location.path()).toEqual('/friends')
    }));

    it("goToSharePostPage() nevigate to '/sharePost'", fakeAsync(() => {
        service.goToSharePostPage()
        tick()
        expect(location.path()).toEqual('/sharePost')
    }));

    it("goToPostsPage() nevigate to '/posts'", fakeAsync(() => {
        service.goToPostsPage()
        tick()
        expect(location.path()).toEqual('/posts')
    }));

    it("goToFriendsPage() nevigate to '/friends'", fakeAsync(() => {
        service.goToFriendsPage()
        tick()
        expect(location.path()).toEqual('/friends')
    }));

    it("goToFriendsPage() nevigate to '/friends'", fakeAsync(() => {
        service.goToFriendsPage()
        tick()
        expect(location.path()).toEqual('/friends')
    }));

    it("nevigate to '' redirects you to /login ", fakeAsync(() => {
        router.navigate([''])
        tick()
        expect(location.path()).toEqual('/login')
    }));

    it("nevigate to not exist route redirects you to /login ", fakeAsync(() => {
        router.navigate(['afdfaerwecwdvfwdcascasdascasdvsfascadsf'])
        tick()
        expect(location.path()).toEqual('/login')
    }));

});

function setComponent(route: Route, componentsArray: any[]): any {
    //if route as component set a mock component instead else set undefind
    return route.component ?
        getComponentByName(route.component.name) || getDefaultComponent()
        : undefined;

    function getComponentByName(name: string): any {
        return componentsArray.find(comp => comp.name == name);
    }

    function getDefaultComponent(): any {
        return componentsArray[0]
    }
}

