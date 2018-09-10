import { helper } from '@ember/component/helper';
import URL from 'url';
export function posterUrl(params/*, hash*/) {
  let url = new URL(params[0]);
  let suffix = url.pathname.split('.').pop();

  if (url.host.match('imgur')) {
    url.pathname = url.pathname.replace(`.${suffix}`, '.jpg');
    return url.href;
  }
  else if (url.host.match('giphy')) {
    url.pathname = url.pathname.replace(`.${suffix}`, '.gif');
    return url.href;
  }

  return "";
}

export default helper(posterUrl);
