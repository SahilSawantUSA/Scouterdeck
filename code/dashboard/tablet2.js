const SERVICE_UUID2 = "974f9e8a-124d-43a8-8896-9a5ba15526be";
const CHARACTERISTIC_UUID2 = "03029100-6d76-46c9-b233-7614d893a6ac";

const statusLabel2 = document.getElementById("statusLabel2");
const connectButton2 = document.getElementById("connectButton2");

let lastValue2 = "";

connectButton2.addEventListener("click", connect2);

function displayStatus2(status) {
  statusLabel2.innerHTML = status;
}

async function connect2() {
  displayStatus2("Searching devices for service " + SERVICE_UUID2);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET2" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus2("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus2("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID2);
    displayStatus2("Connected to service " + SERVICE_UUID2);

    const characteristic = await service.getCharacteristic(
      CHARACTERISTIC_UUID2
    );
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();

        let value = "";
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            console.log("Tablet 2: " + readData.getUint8(i));
            if (readData.getUint8(i) == 255) {
              value = value + ",";
            } else {
              value = value + readData.getUint8(i);
            }
          }
          if (value != lastValue2) {
            lastValue2 = value;
            displayStatus2(value);
          }
        }
      } catch (error) {
        displayStatus2("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus2("Error: " + error);
  }
}
