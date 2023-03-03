const SERVICE_UUID1 = '974f9e8a-124d-43a8-8896-9a5ba15526be';
const CHARACTERISTIC_UUID1 = '03029100-6d76-46c9-b233-7614d893a6ac';

const statusLabel1 = document.getElementById('statusLabel1');
const connectButton1 = document.getElementById('connectButton1');

let lastValue1 = "";

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "Scouter",
  password: "Data2Banner"
});


connectButton1.addEventListener('click', connect1);

function displayStatus(status) {
  statusLabel1.innerHTML = status;
}

async function connect1() {
  displayStatus("Searching devices for service " + SERVICE_UUID1);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET1" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID1);
    displayStatus("Connected to service " + SERVICE_UUID1);

    const characteristic = await service.getCharacteristic(
      CHARACTERISTIC_UUID1
    );
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();

        let value = "\'";
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            console.log("Tablet 1: " + readData.getUint8(i));
            if (readData.getUint8(i) == 255) {
              value = value + "\',\'";
            } else {
              value = value + readData.getUint8(i);
            }
          }
          value  = value + "\'";
          if (value != lastValue1) {
            lastValue1 = value;
            displayStatus(value);

            con.connect(function(err) {
              if (err) throw err;
              console.log("Connected!");
              var sql = `INSERT INTO match_data (matchNumber, tablet, teamnumber, scouter, timestamp, gamepiecepreload, automove, autogamepiecesaqquired, autoplacetr, autoplacemr, autoplacebr, autochargestation, automidline, telegamepiecesaqquired, teleplacetr, teleplacemr, teleplacebr, chargestation, playeddefense, wasdefended) VALUES (${value})`;
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              });
            });
          }
        }
      } catch (error) {
        displayStatus("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus("Error: " + error);
  }
}
