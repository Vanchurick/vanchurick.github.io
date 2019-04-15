import View from "./js/view";
import Model from "./js/model";
import Controller from './js/controller';
import './scss/style.scss';

const view = new View();
const model = new Model();
const controller = new Controller(model, view)
controller.loadPage();