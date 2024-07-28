// .env.example 파일을 .env로 파일명을 수정하고, 적절한 데이터를 입력하세요.
// TODO와 FILL_ME_IN 부분을 확인해서 코드를 완성시키세요.

const axios = require('axios').default;
require('dotenv').config();

const consumer = async (event) => {
  const processedRecords = [];

  for (const record of event.Records) {
    try {
      const json = JSON.parse(record.body).MessageAttributes;
      console.log(`도착 데이터 : ${JSON.stringify(json)}`);
      
      // TODO: json 객체에서 필요한 정보를 추출하여 변수에 할당하세요. -> 할당한 변수들은 payload에 활용하세요.
        // 힌트: 공장 API 문서를 보고 필요한 데이터를 확인하세요.

      // TODO: payload 객체를 생성하세요.
        // 힌트: API 문서를 참조하여 필요한 모든 필드를 포함시키세요.
      const payload = {
        // 여기에 코드를 작성하세요
      };
      
      console.log(`payload : ${JSON.stringify(payload)}`);
      console.log(`현재 등록된 공장 시스템 주소(factory lambda url) : ${process.env.FACTORY_URL}`);
      

      // TODO: axios. 뒤에 적절한 http 메소드를 입력하세요.
      // TODO: 공장 주소 뒤에 들어가야하는 적절한 path를 입력하세요.
      try {
        const response = await axios.FILL_ME_IN(
          `${process.env.FACTORY_URL}/FILL_ME_IN(path)`,
          payload,
          { timeout: 60000 } // 60초 타임아웃 설정
        );
        
        console.log(`공장에서 온 응답 : ${JSON.stringify(response.data)}`);
        
        processedRecords.push({ id: record.messageId, success: true });
      } catch (axiosError) {
        if (axiosError.code === 'ECONNABORTED') {
          throw new Error(`공장 요청 타임아웃: ${process.env.FACTORY_URL}`);
        } else if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'ECONNREFUSED') {
          throw new Error(`공장 URL을 찾을 수 없음: ${process.env.FACTORY_URL}`);
        } else if (axiosError.response) {
          throw new Error(`공장에서 오류 응답: ${axiosError.response.status} - ${axiosError.response.data}`);
        } else if (axiosError.request) {
          throw new Error(`공장으로부터 응답 없음: ${process.env.FACTORY_URL}`);
        } else {
          throw new Error(`요청 설정 중 오류 발생: ${axiosError.message}`);
        }
      }
    } catch (error) {
      console.error(`처리 중 오류 발생: ${error.message}`);
      processedRecords.push({ id: record.messageId, success: false, error: error.message });
    }
  }

  const failedRecords = processedRecords.filter(record => !record.success);

  if (failedRecords.length > 0) {
    const errorMessages = failedRecords.map(record => `메시지 ID ${record.id}: ${record.error}`).join('\n');
    throw new Error(`메시지 처리 실패:\n${errorMessages}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: '모든 메시지 처리 성공' })
  };
};

module.exports = {
  consumer,
};