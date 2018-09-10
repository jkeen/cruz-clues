import { helper } from '@ember/component/helper';
import URL from 'url';

export function videoUrl(params/*, hash*/) {
  let url = new URL(params[0]);
  let suffix = url.pathname.split('.').pop();

  if (url.host.match('imgur')) {
    url.pathname = url.pathname.replace(`.${suffix}`, '.mp4');
  }
  else if (url.host.match('giphy')) {
    url.pathname = url.pathname.replace(`.${suffix}`, '.mp4');
  }

  return url.href;
}

export default helper(videoUrl);
