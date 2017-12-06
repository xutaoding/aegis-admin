// const SERVER = 'http://127.0.0.1:8000/api';
const SERVER = 'http://192.168.216.173:8000/api';

export default {
  'login': SERVER + '/account/login',
  'sendMail': SERVER + '/account/mail/send',
  'registerUser': SERVER + '/account/register',
  'forgetPassword': SERVER + '/account/forget-password',

  'aegisDownloader': SERVER + '/aegis/downloader',
  'aegisIsPayment': SERVER + '/aegis/{username}/payment',
  'createSpider': SERVER + '/aegis/spider-task/create',
  'listSpider': SERVER + '/aegis/spider-task/list',
  'logSpider': SERVER + '/aegis/spider-task/log',
  'modifySpider': SERVER + '/aegis/spider-task/modify',
  'oneSpider': SERVER + '/aegis/spider-task/one',
  'obtainHtml': SERVER + '/aegis/html/obtain',

  'listData': SERVER + '/aegis/spider-data/',

}

