import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import './css/styles.scss';

const view = new View();
const model = new Model();


const contr = new Controller(model, view);





