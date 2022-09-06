import { App } from 'vue';
import registerProperties from './register-properties';
import registerElement from './registerElement';
export function registerApp(app:App):void {
  app.use(registerElement)
  app.use(registerProperties)
}
