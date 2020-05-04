import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';
import { StorageService } from './storage.service';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { IUser } from '../model/user';

const JWT_Module_Options: JwtModuleOptions = {
    config: {
        tokenGetter: () => "token"
    }
};

describe('JwtService', () => {
    let service: JwtService;
    let storage: StorageService;
    const mockUser: IUser = { _id: "123", active: true, email: "g@gmail.com", name: "g", role: "" }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                JwtModule.forRoot(JWT_Module_Options)
            ],
            providers: [
                JwtService,
                StorageService
            ]
        });
        service = TestBed.inject(JwtService);
        storage = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getUserId() should return userId when token exist', () => {
        overrideGetUserFunc(service, mockUser);
        storage.setToken("mockToken")
        expect(service.getUserId()).toBeTruthy();
        expect(service.getUserId()).toEqual(mockUser._id);
    });

    it('getUserId() should return null when token is mot exist', () => {
        storage.removeToken()
        expect(service.getUserId()).toBeNull();
    });

    it('getUserId() should call getUserFromToken() when token exist', () => {
        const mockToken = "mockToken"
        const getUserFromToken_spy = spyOn((service as any), "getUserFromToken").withArgs(mockToken)
            .and.returnValue(mockUser)
        storage.setToken(mockToken)
        service.getUserId()
        expect(getUserFromToken_spy).toHaveBeenCalled();
    });

    it('getUserId() should`nt call getUserFromToken() when token is not exist', () => {
        const getUserFromToken_spy = spyOn((service as any), "getUserFromToken")
        storage.removeToken()
        service.getUserId()
        expect(getUserFromToken_spy).not.toHaveBeenCalled();
    });

    it('getUser() should return null when token is not exist', () => {
        storage.removeToken()
        expect(service.getUser()).toBeNull();
    });

    it('getUser() should call getUserFromToken() when token exist', () => {
        const mockToken = "mockToken"
        const getUserFromToken_spy = spyOn((service as any), "getUserFromToken").withArgs(mockToken)
            .and.returnValue(mockUser)
        storage.setToken(mockToken)
        service.getUser()
        expect(getUserFromToken_spy).toHaveBeenCalled();
    });

    it('getUser() should`nt call getUserFromToken() when token is not exist', () => {
        const getUserFromToken_spy = spyOn((service as any), "getUserFromToken")
        storage.removeToken()
        service.getUser()
        expect(getUserFromToken_spy).not.toHaveBeenCalled();
    });

    it('getUser() should return user when token exist', () => {
        overrideGetUserFunc(service, mockUser);
        storage.setToken("mockToken")
        expect(service.getUser()).toBeTruthy();
        expect(service.getUser()).toEqual(mockUser);
    });
});

function overrideGetUserFunc(service: JwtService, mockUser: IUser) {
    (service as any).getUserFromToken = (token) => {
        if (token)
            return mockUser;
        return null;
    };
}

