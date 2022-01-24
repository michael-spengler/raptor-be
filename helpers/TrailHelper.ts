export class TrailHelper {
    
    public parseSearchKeys(searchKeys: any) {
        console.log(`Receiving the following search Query: ${JSON.stringify(searchKeys)}`)
        return searchKeys;
    }
};