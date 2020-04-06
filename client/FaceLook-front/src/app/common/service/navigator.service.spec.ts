import { TestBed } from '@angular/core/testing';
import { NavigatorService } from './navigator.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('NavigatorService', () => {
    let service: NavigatorService;
    let activatedRouteSnapshot: ActivatedRouteSnapshot;
    let routerStateSnapshot: RouterStateSnapshot;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                NavigatorService,
                { provide: ActivatedRouteSnapshot, useValue: { data: {} } },
                { provide: RouterStateSnapshot, useValue: {} },
            ]
        });
        activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
        routerStateSnapshot = TestBed.get(RouterStateSnapshot);
        service = TestBed.inject(NavigatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
