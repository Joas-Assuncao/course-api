import app from './app';

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
});