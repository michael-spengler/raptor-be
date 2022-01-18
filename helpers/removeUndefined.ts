function removeUndefined(arr: any) {
    try {
        var resultArray = arr.filter((row: any) => {
            var ignoreValue = Object.values(row).some(elem => elem === undefined);
            return !ignoreValue ? true : false;
        });
    }
    catch (e) {
        resultArray = (e as Error).message;
    }
    
    return resultArray;
}

export default removeUndefined;
