export const createSpy = (...functions: spyParams[]) => {
    const service = jasmine.createSpyObj('postApiService', [functions.map(param => param.method)])
    functions.forEach(element => {
        service[element.method].and.returnValue(element.returnValue)
    });

    return service
}

interface spyParams {
    method: string,
    returnValue?: any
}