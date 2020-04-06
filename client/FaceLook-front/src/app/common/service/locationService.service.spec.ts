import { TestBed } from '@angular/core/testing';
import { LocationService, GeoLocation } from './locationService.service';


describe('LocationService', () => {
    let service: LocationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(service.navigator).toBeTruthy("the navigator property should ne initialize in ctor");
    });

    it('getLocation should return a Promise', () => {
        expect(service.getLocation()).toEqual(jasmine.any(Promise));
    });

    it('private GetLocationCallback() should apply reject action when #navigator is undefined', () => {
        service.navigator = undefined
        const promiseResponse = {
            reject: () => { },
            resolve: () => { }
        }
        const reject_spy = spyOn(promiseResponse, 'reject');
        (service as any).GetLocationCallback(promiseResponse.resolve, promiseResponse.reject);
        expect(reject_spy).toHaveBeenCalled()
    });

    it('private GetLocationCallback() should call window.navigator.geolocation.getCurrentPosition() when #navigator is defined', () => {
        service.navigator = window.navigator
        const promiseResponse = {
            reject: () => { },
            resolve: () => { }
        }
        const getCurrentPosition_spy = spyOn(window.navigator.geolocation, 'getCurrentPosition');
        (service as any).GetLocationCallback(promiseResponse.resolve, promiseResponse.reject);
        expect(getCurrentPosition_spy).toHaveBeenCalled()
    });

    // fit('private GetLocationCallback() should apply window.navigator.geolocation.getCurrentPosition() action when #navigator is defined', () => {
    //     const promiseResponse = {
    //         reject: () => { },
    //         resolve: () => { }
    //     }
    //     const resolve_spy = spyOn(promiseResponse, 'resolve');
    //     (service as any).GetLocationCallback(promiseResponse.resolve, promiseResponse.reject);
    //     expect(resolve_spy).toHaveBeenCalled()
    // });
});
