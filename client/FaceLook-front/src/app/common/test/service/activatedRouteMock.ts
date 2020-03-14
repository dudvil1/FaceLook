export interface IActivatedRouteMock {
    snapshot: Snapshot,
    setSnapshot(snapshot: Snapshot),
    setSnapshotPath(path: string)
}
interface Snapshot {
    routeConfig: {
        path: string
    }
}

export class ActivatedRouteMock implements IActivatedRouteMock {
    snapshot: Snapshot

    setSnapshot(snapshot: Snapshot) {
        this.snapshot = snapshot
    }
    setSnapshotPath(path: string) {
        this.snapshot.routeConfig.path = path
    }

    constructor() {
        this.snapshot = {
            routeConfig: {
                path: ''
            }
        }
    }
}