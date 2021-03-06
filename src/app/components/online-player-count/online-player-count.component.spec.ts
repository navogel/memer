import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlinePlayerCountComponent } from './online-player-count.component';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { of } from 'rxjs';

describe('OnlinePlayerCountComponent', () => {
    let component: OnlinePlayerCountComponent;
    let fixture: ComponentFixture<OnlinePlayerCountComponent>;
    let afdb: jasmine.SpyObj<AngularFireDatabase>;

    beforeEach(async(() => {
        afdb = jasmine.createSpyObj<AngularFireDatabase>('AngularFireDatabase', ['object']);
        afdb.object.and.returnValue({
            valueChanges: () => of(100)
        } as AngularFireObject<number>);

        TestBed.configureTestingModule({
            declarations: [OnlinePlayerCountComponent],
            providers: [
                {
                    provide: AngularFireDatabase,
                    useValue: afdb
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OnlinePlayerCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
