process.on('message', (amount) => {
  let results = {};
  for (let i = 0; i < amount; i++) {
    const randomNumber = Math.floor(Math.random() * (1001 - 1) + 1);
    if (!results[randomNumber]) {
      results[randomNumber] = 1;
    } else {
      results[randomNumber] = results[randomNumber] + 1;
    }
  }

  process.send(results);
  process.exit();
});

process.send('ready');
