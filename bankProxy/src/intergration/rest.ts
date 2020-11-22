import express, { response } from 'express'
import { MomRequest } from '../logic/momFacade';
import MomHandler from '../logic/momHandler';
import settings from '../settings';



export default class Rest {
    private app = express();
    private handler = new MomHandler();
    private port = settings.REST_PORT;


    public start(): void {

        this.handler.start();
        this.app.use(express.json());

        this.app.post('/', (req, res) => {
            let momRequest: MomRequest = req.body;
            this.handler.makeLoanRequest(momRequest, (responseArray) => {
                res.json(responseArray);
            })
        })

        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}