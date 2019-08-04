class Application {
    static main() {
        const wrapper = document.querySelector('.wrapper');
        const garland = new Garland(wrapper);
        const changeButton = document.getElementById('change-button')
        changeButton.addEventListener('click', garland.onChangeWay.bind(garland));
        garland.initLights().start();
    }
}

Application.main();
