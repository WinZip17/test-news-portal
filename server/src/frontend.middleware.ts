import { NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const resolvePath = (file: string) => path.resolve(`./dist/${file}`);

export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { baseUrl } = req;
    if (baseUrl.indexOf('/api') === 0) {
      console.log('api');
      next();
    } else {
      console.log('no api', baseUrl);
      if (req.headers.accept.includes('html')) {
        res.sendFile(resolvePath('index.html'));
      } else {
        res.sendFile(resolvePath(baseUrl));
      }
    }
  }
}
