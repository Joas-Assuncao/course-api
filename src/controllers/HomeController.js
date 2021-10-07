class HomeController {
    async index(request, response) {
        response.send('Hello World');
    }
}

export default new HomeController();
