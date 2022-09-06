import { formatUTC } from '@/utils/date-format';
import { App } from 'vue';
export default function registerProperties(app:App) {
  app.config.globalProperties.$filter= {
    formatTime(value:string) {
      return formatUTC(value)
    }
  }
}

