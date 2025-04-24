export function isCognito() {
  return new Promise((resolve, reject) => {
    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) {
      return reject('check failed');
    }
    fs(window.TEMPORARY, 100, function() {
      resolve(false);
    }, function(err) {
      resolve(true);
    });
  })
}
