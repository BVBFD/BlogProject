// netlify/functions/wakeup.js

exports.handler = async function (event, context) {
  try {
    // 여기에 깨우고 싶은 서버의 코드 또는 로직을 추가할 수 있습니다.
    // 예를 들어, 외부 URL에 HTTP GET 요청을 보내고자 하는 경우:
    const axios = require('axios');
    const response = await axios.get('https://lsevina126.netlify.app/post/635bc5867d980050320932ff');

    return {
      statusCode: response.status,
      body: response.data,
    };
  } catch (error) {
    console.error('Error waking up server:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
