import { Observable, of } from 'rxjs'

export interface IActivatedRouteMock {
    snapshot: Snapshot,
    params: Observable<any>
    setSnapshot(snapshot: Snapshot),
    setSnapshotPath(path: string),
    setParams(param: any)
}
interface Snapshot {
    routeConfig: {
        path: string
    }
}

export class ActivatedRouteMock implements IActivatedRouteMock {
    snapshot: Snapshot
    params: Observable<any>
    private param: any = {}

    setSnapshot(snapshot: Snapshot) {
        this.snapshot = snapshot
    }
    setSnapshotPath(path: string) {
        this.snapshot.routeConfig.path = path
    }
    setParams(param: any) {
        this.param = param
    }

    constructor() {
        this.snapshot = {
            routeConfig: {
                path: ''
            }
        }
        this.params = new Observable(subscriber => subscriber.next(this.param))
    }

}