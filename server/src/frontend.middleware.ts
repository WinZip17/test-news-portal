import { NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const resolvePath = (file: string) => path.resolve(`./dist/${file}`);

export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { baseUrl } = req;
    console.log('baseUrl', baseUrl);

    if (baseUrl.indexOf('/api') === 0 || baseUrl.indexOf('admin') === 0) {
      console.log('next api');
      next();
    } else {
      console.log('no next', baseUrl);
      if (req.headers.accept.includes('html')) {
        res.sendFile(resolvePath('index.html'));
      } else {
        res.sendFile(resolvePath(baseUrl));
      }
    }
  }
}
