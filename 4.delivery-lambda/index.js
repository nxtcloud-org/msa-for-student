// .env.example 파일을 .env로 파일명을 수정하고, 적절한 데이터를 입력하세요.
// TODO와 FILL_ME_IN 부분을 확인해서 코드를 완성시키세요.

const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  HOSTNAME: host,
  USERNAME: user,
  PASSWORD: password,
  DATABASE: database
} = process.env;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const consumer = async (event) => {
  console.log("#####################################")
  console.log(`도착 데이터 : ${event.body}`);
  console.log("#####################################")
  let json;
  try {
    json = JSON.parse(event.body);
  } catch (error) {
    console.error('JSON parsing error:', error);
    return;
  }
  
  // TODO : 생산된 제품을 데이터베이스에 등록하기 위해서 필요한 정보는 수량과 상품 id 입니다.
    // 힌트 : 로그에서 확인 도착데이터(event.body)를 확인해서 quantity, item_id의 변수에 할당하세요.
    // 힌트 : 주고 받는 데이터의 type에 유의하세요.

  const quantity = FILL_ME_IN;
  const item_id = FILL_ME_IN;
  console.log(`quantity : ${quantity}`);
  console.log(`item_id: ${item_id}`);

  try {
    await delay(5000); // 5초 대기
    console.log("공장에서 받아온 물건 하역중..")
    await delay(5000); // 5초 대기
    console.log("물건 목록 확인중..")
    await delay(5000); // 5초 대기
    console.log("물건 수량 확인중..")
    await delay(5000); // 5초 대기
    console.log("창고에 물건 적재중..")
    await delay(5000); // 5초 대기
    console.log("적재 내용 데이터베이스에 등록중..")

    // 데이터베이스에 연결
    const connect = await mysql.createConnection({ host, user, password, database });
    
    // 현재 재고사항 파악
    const [quantity_in_db] = await connect.query(`SELECT quantity from items WHERE item_id = ${item_id};`);
    const quantity_before = quantity_in_db[0].quantity;
    
    // 기존 재고 + 생산된 물품 수량 확인
    const total_quantity = FILL_ME_IN
    
    // TODO: 데이터베이스의 items 테에블에서, 생산된 물품(item_id)에 수량 정보(quantity)를 수정하는 쿼리 작성하기
    const query=`FILL_ME_IN`
    
    
    await connect.query(query);
    console.log(`배송완료 - item_id : ${item_id}, quantity: ${total_quantity}`);
    await connect.end();
    
    
  } catch (e) {
    console.log(`데이터베이스 연결 오류 : ${e}`);
  }
};

module.exports = {
  consumer,
};
