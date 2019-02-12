import app from "./app";
import {port} from './constants/server';

app.listen(port, () => console.log(`App listening on port ${port}!`));
