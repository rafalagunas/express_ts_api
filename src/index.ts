import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import module from './hot';
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
};

const PORT: Number = parseInt(process.env.PORT as string, 10);
const app: express.Application = express()


app.use(helmet());
app.use(cors());
app.use(express.json());


const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.get("/", (req: express.Request, res: express.Response) => {
    let object = {
        status: 200,
        text: "We are working",
        date: Date()
    }
    res.status(object.status).send(object)
})

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}