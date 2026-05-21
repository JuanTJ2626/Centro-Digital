const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function test() {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbyaoKezbC1bxMz6K5kAhygzBS7aKk9JNYA2QGn2bsS9Bqt2tfoYZAY0diS4EDJAuwlZ/exec';
    const data = await get(url);
    
    console.log("Searching all fields for keywords...");
    data.forEach((item, index) => {
      const match = JSON.stringify(item).toLowerCase();
      if (match.includes("asesor") || match.includes("whatsapp") || match.includes("cotiz")) {
        console.log(`Row ${item._row || index}: Estado=${item.Estado}, Pedido=${item.Pedido}, Producto=${item.Producto}, Acabados=${item.Acabados}`);
      }
    });
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
