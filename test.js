const mysql = require('mysql2/promise');

// --------------------------
// 👉 替换成你的 TiDB 信息！
// --------------------------
const config = {
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com', // 例如 gateway01.xxxx.aws.tidbcloud.com
  port: 4000,
  user: '2AZCtk4Tm3eJ2pe.root', // 例如 root@xxxxxx
  password: 'zijoGVVpCZX67Pqw',
  ssl: { rejectUnauthorized: true }, // TiDB Serverless 强制 SSL
  connectTimeout: 10000
};

async function test() {
  console.log('=== 开始测试 TiDB 连接 ===');
  try {
    const conn = await mysql.createConnection(config);
    console.log('✅ 连接建立成功！');
    const [rows] = await conn.query('SELECT VERSION() AS tidb_version;');
    console.log('✅ 查询成功！TiDB 版本:', rows[0].tidb_version);
    await conn.end();
    console.log('=== 测试完成，连接正常 ===');
  } catch (err) {
    console.log('❌ 连接失败！');
    console.log('错误代码:', err.code);
    console.log('错误信息:', err.message);
  }
}

test();