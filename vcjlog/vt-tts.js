const fs = require('fs');
const Q = require('q');

module.exports = function (request, logger, E) {
  async function saveTTS(fileName, text) {
    // const fileName = `${__dirname}/../sounds/${file}.mp3`;
    if (fs.existsSync(fileName)) {
      logger.warn(new E(`File ${fileName} da ton tai`));
    } else {
      const rs = await Q.fcall(() => request({
          uri: 'https://vtcc.ai/voice/api/tts/v1/rest/syn',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            token:
              '99MheNoiEUOZI7L-h4FYCW3OzKCCP4IG9tDEuXjsqRxu-4LN2-D-G9CU-TzCJqXb'
          },
          body: JSON.stringify({
            text,
            voice: 'doanngocle',
            id: '0',
            without_filter: false,
            speed: 0.7,
            tts_return_option: 3
          }),
          encoding: null
        }))
        // .then((ars) => {
        //   console.log(ars);
        //   throw new E('xxxxxxxxxxxx');
        // })
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
