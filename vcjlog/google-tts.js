// curl - X POST \
// https://api.fpt.ai/hmi/tts/v5 \
// -H 'api_key: CGKVjIKUVIu83LRC6c0iIs6cWLdTJJw4' \
// -H 'speed: 0' \
// -H 'voice: banmai' \
// -d '{"text":"con bò"}'
const fs = require('fs');
const Q = require('q');
const { URL } = require('url');

module.exports = function (request, logger, E) {
  //   console.log(logger);
  let dumpHeader = `POST https://content-texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCXd3M-Cb0KvyBMKTNS23nfaoiez6l51Go&alt=json HTTP/1.1
Host: content-texttospeech.googleapis.com
Connection: keep-alive
Content-Length: 29
Origin: https://content-texttospeech.googleapis.com
X-Origin: https://developers.google.com
X-ClientDetails: appVersion=5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F75.0.3770.142%20Safari%2F537.36&platform=Win32&userAgent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F75.0.3770.142%20Safari%2F537.36
X-Goog-Encode-Response-If-Executable: base64
Authorization: Bearer ya29.GltYB0eN8cnD1NuFNNwHH86CRGoF3DerXrePM6hjjcX4OK4FhaTeM0_Aef0EW3BQ63hXoeJQPB5-qjP7Ai9w9Pso2VgN-URhzxIejQtu-QpD4DnWi0rHgX4rtJ_C
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
X-Requested-With: XMLHttpRequest
X-JavaScript-User-Agent: apix/2.0.0 google-api-javascript-client/1.1.0
X-Referer: https://developers.google.com
DNT: 1
Accept: */*
X-Client-Data: CIm2yQEIorbJAQjBtskBCImSygEIqZ3KAQioo8oBCLGnygEI4qjKAQjxqcoBCJetygEIza3KAQjtrcoBCKGyygE=
Referer: https://content-texttospeech.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.y5hhWjOdu80.O%2Fam%3DwQE%2Fd%3D1%2Frs%3DAGLTcCNsKzxWFhezE2KkFP7auTmVDBiNEQ%2Fm%3D__features__
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9,vi;q=0.8`;
  dumpHeader = dumpHeader.replace('POST ', '').replace(' HTTP/1.1', '');
  const arr = dumpHeader
    .split('\n')
    .filter(
      o => !o.match(/Content-Length:\s/) && !o.match(/Accept-Encoding: /)
    );
  const url = arr.shift();
  const headers = {};
  arr.forEach((s) => {
    const items = s.split(': ');
    headers[items[0]] = items[1];
  });

  //   logger.debug('xxxxxxxxxx');
  async function saveTTS(fileName, text) {
    // const fileName = `${__dirname}/../sounds/${file}.mp3`;
    if (fs.existsSync(fileName)) {
      logger.warn(new E(`File ${fileName} da ton tai`));
    } else {
      const rs = await Q.fcall(() => request({
          uri: url,
          method: 'POST',
          headers,
          body: JSON.stringify({
            input: {
              text
            },
            voice: {
              languageCode: 'vi-VN'
            },
            audioConfig: {
              audioEncoding: 'mp3'
            }
          })
          // encoding: null,
        }))
        .catch((e) => {
          throw new E('Lỗi request fpt api', e);
        })

        .then(ars => JSON.parse(ars))
        .then(js => Q.Promise((resolve) => {
            const buf = js.audioContent;
            console.log(js);
            resolve(Buffer.from(buf, 'base64'));
          }))

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
