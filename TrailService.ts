export class TrailService {

    public findACoolTrail(searchParams: any) {
        console.log(`Search query: ${JSON.stringify(searchParams)}`)
        return searchParams
    }
}