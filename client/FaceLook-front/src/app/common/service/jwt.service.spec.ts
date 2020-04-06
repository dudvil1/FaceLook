import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';
import { StorageService } from './storage.service';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

const JWT_Module_Options: JwtModuleOptions = {
    config: {
        tokenGetter: () => "token"
    }
};


describe('JwtService', () => {
    let service: JwtService;

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
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
