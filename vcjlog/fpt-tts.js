// curl - X POST \
// https://api.fpt.ai/hmi/tts/v5 \
// -H 'api_key: CGKVjIKUVIu83LRC6c0iIs6cWLdTJJw4' \
// -H 'speed: 0' \
// -H 'voice: banmai' \
// -d '{"text":"con bò"}'
const fs = require('fs');
const Q = require('q');

module.exports = function (request, logger, E) {
  //   console.log(logger);

  //   logger.debug('xxxxxxxxxx');
  async function saveTTS(fileName, text) {
    // const fileName = `${__dirname}/../sounds/${file}.mp3`;
    if (fs.existsSync(fileName)) {
      logger.warn(new E(`File ${fileName} da ton tai`));
    } else {
      const rs = await request({
        uri: 'https://api.fpt.ai/hmi/tts/v5',
        method: 'POST',
        headers: {
          api_key: 'CGKVjIKUVIu83LRC6c0iIs6cWLdTJJw4',
          speed: '0',
          voice: 'banmai'
        },
        body: JSON.stringify(text)
        // encoding: null,
      })
        .catch((e) => {
          throw new E('Lỗi request fpt api', e);
        })
        .then(ars => JSON.parse(ars))
        .then(() => Q.Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          }))
        .then(js => request({ uri: js.async, encoding: null }))
        .catch((e) => {
          logger.error(new E('Lỗi khi sinh text', e));
          return null;
        });
      if (rs) {
        // console.log(rs);
        fs.writeFileSync(fileName, rs);
        logger.debug('Create sound file success');
      }
    }
  }
  return {
    saveTTS
  };
};
