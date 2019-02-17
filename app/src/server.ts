import {config} from 'dotenv';
import app from "./app";
import {port} from './constants/server';

config();

app.listen(port, () => console.log(`App listening on port ${port}!`));
