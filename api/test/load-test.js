const autocannon = require('autocannon');
const { v4: uuidv4 } = require('uuid');

// Генерируем пул заранее
const POOL_SIZE = 50000;
const seat_id = '550e8400-e29b-41d4-a716-446655440000';
const bodyPool = Array.from({ length: POOL_SIZE }, () =>
  JSON.stringify({ seat_id, user_id: uuidv4() })
);

let idx = 0;

const instance = autocannon({
  url: 'http://127.0.0.1:3000',
  connections: 500,
  amount: POOL_SIZE,
  pipelining: 1,
  requests: [
    {
      method: 'POST',
      path: '/reserve',
      headers: { 'content-type': 'application/json' },
      setupRequest(req) {
        req.body = bodyPool[idx % POOL_SIZE];
        idx++;
        return req;
      }
    }
  ]
}, (err, result) => {
  if (err) return console.error(err);

  const statusCodes = result.statusCodeStats || {};
  console.log('\n--- РАСПРЕДЕЛЕНИЕ СТАТУС-КОДОВ ---');
  Object.entries(statusCodes).forEach(([code, stat]) => {
    console.log(`Код ${code}: ${stat.count} запросов`);
  });

  const success = statusCodes['201']?.count || 0;
  const conflict = statusCodes['409']?.count || 0;

  console.log(`\nИТОГ:`);
  console.log(`- Успешных броней (201): ${success}`);
  console.log(`- Отказано (409): ${conflict}`);

  if (success <= 1 && (success + conflict) === POOL_SIZE) {
    console.log('\n✅ Race Condition не допущен.');
  } else if (success > 1) {
    console.log(`\n❌ ДУБЛИКАТЫ: ${success} брони прошли одновременно!`);
  }
});

autocannon.track(instance, { renderProgressBar: true });
