import { TestBed } from '@angular/core/testing';
import { GuardService } from './guard.service';
import { NavigatorService } from './navigator.service';
import { NavigatorMockService } from '../test/service/navigatorMockService';
import { ActivatedRouteMock } from '../test/service/activatedRouteMock';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './storage.service';

describe('GuardService', () => {
    let service: GuardService;
    let navigatorService: NavigatorService;
    let storageService: StorageService;
    const route: any = {
        data: {
            jwtNeeded: false
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GuardService,
                StorageService,
                { provide: NavigatorService, useClass: NavigatorMockService },
                { provide: ActivatedRoute, useClass: ActivatedRouteMock },
            ]
        });
        service = TestBed.inject(GuardService);
        storageService = TestBed.inject(StorageService);
        navigatorService = TestBed.inject(NavigatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('When Token Exist and direct route doesnt need Token - should navigate to HomePage', () => {
        //token exist but route doesnt need token
        setEnv(true, false)
        const goToHomePage_spy = spyOn(navigatorService, 'goToHomePage')
        service.canActivate(route, null)
        expect(goToHomePage_spy).toHaveBeenCalled()
    });

    it('When Token not Exist and direct route need Token - should navigate to loginPage', () => {
        //token not exist but route need token
        setEnv(false, true)
        const goToLogin_spy = spyOn(navigatorService, 'goToLogin')
        service.canActivate(route, null)
        expect(goToLogin_spy).toHaveBeenCalled()
    });

    it('canActivate() should return true -When Token exist and direct route need Token are true', () => {
        //token exist and route need token
        setEnv(true,true)
        const canActive = service.canActivate(route, null)
        expect(canActive).toBeTruthy()
    });

    it('canActivate() should return true -When Token exist and direct route need Token are false', () => {
        //token not exist and route doesnt need token
        setEnv(false,false)
        const canActive = service.canActivate(route, null)
        expect(canActive).toBeTruthy()
    });

    it('canActivate() should return false -When Token not exist but direct route need Token', () => {
        //token not exist but route need token
        setEnv(false, true)
        const canActive = service.canActivate(route, null)
        expect(canActive).toBeFalsy()
    });

    it('canActivate() should return false -When Token exist and direct route doesnt need Token', () => {
        //token exist but route doesnt need token
        setEnv(true, false)
        const canActive = service.canActivate(route, null)
        expect(canActive).toBeFalsy()
    });

    function setEnv(setToken: boolean, routeNeedToken: boolean) {
        setToken ? storageService.setToken("token") : storageService.removeToken()
        route.data.jwtNeeded = routeNeedToken
    }
});
