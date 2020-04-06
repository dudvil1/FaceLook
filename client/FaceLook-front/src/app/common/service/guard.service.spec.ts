import { TestBed } from '@angular/core/testing';
import { GuardService } from './guard.service';
import { NavigatorService } from './navigator.service';
import { NavigatorMockService } from '../test/service/navigatorMockService';
import { ActivatedRouteMock } from '../test/service/activatedRouteMock';
import { ActivatedRoute } from '@angular/router';


describe('GuardService', () => {
    let service: GuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GuardService,
                { provide: NavigatorService, useClass: NavigatorMockService },
                { provide: ActivatedRoute, useClass: ActivatedRouteMock },
            ]
        });
        service = TestBed.inject(GuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
