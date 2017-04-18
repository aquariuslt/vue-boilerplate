/* Created by Aquariuslt on 2017-03-04.*/
import winston from 'winston';
import moment from 'moment';

/**
 * Use logger log format like gulp format
 * */
let logger = new (winston.Logger)({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      formatter: function (options) {
        return '[' + moment().format('HH:mm:ss') + '] '
          + options.message;
      }
    })
  ]
});


export default logger;
