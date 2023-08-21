import Model from './models/model';
import View from './views/view';
import Controller from './controllers/controller';

export class App {
  /**
   * Constructor off App object
   */
  constructor() {}

  /**
   * Function for starting the App
   */
  start = async (): Promise<void> => {
    const controller: Controller = new Controller(new Model(), new View());
    await controller.init();
  };
}
