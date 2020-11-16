'use strict';

const packageUrls = require('./packageUrls');
module.exports = function (framework, cdn) {
  const imap = {
    imports: {},
  };

  imap.imports = packageUrls[cdn][framework];

  return JSON.stringify(imap, null, 2);
};
