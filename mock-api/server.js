const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3080;

app.use(express.static(path.join(__dirname, '../interface/build')));
app.use(express.json());

const ENDPOINT_ROOT = "/rest/";

// NTP
const NTP_STATUS_ENDPOINT = ENDPOINT_ROOT + "ntpStatus";
const NTP_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "ntpSettings";
const TIME_ENDPOINT = ENDPOINT_ROOT + "time";
const ntp_settings = {
    "enabled": true, "server": "time.google.com", "tz_label": "Europe/Amsterdam", "tz_format": "CET-1CEST,M3.5.0,M10.5.0/3"
};
const ntp_status = {
    "status": 1, "utc_time": "2021-04-01T14:25:42Z", "local_time": "2021-04-01T16:25:42", "server": "time.google.com", "uptime": 856
}

// AP
const AP_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "apSettings";
const AP_STATUS_ENDPOINT = ENDPOINT_ROOT + "apStatus";
const ap_settings = {
    "provision_mode": 1, "ssid": "ems-esp", "password": "ems-esp-neo", "local_ip": "192.168.4.1",
    "gateway_ip": "192.168.4.1", "subnet_mask": "255.255.255.0"
};
const ap_status = {
    "status": 1, "ip_address": "192.168.4.1", "mac_address": "3C:61:05:03:AB:2D", "station_num": 0
};

// NETWORK
const NETWORK_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "networkSettings";
const NETWORK_STATUS_ENDPOINT = ENDPOINT_ROOT + "networkStatus";
const SCAN_NETWORKS_ENDPOINT = ENDPOINT_ROOT + "scanNetworks";
const LIST_NETWORKS_ENDPOINT = ENDPOINT_ROOT + "listNetworks";
const network_settings = {
    ssid: "myWifi", password: 'myPassword', hostname: 'ems-esp', static_ip_config: false
};
const network_status =
{
    "status": 3, "local_ip": "10.10.10.101", "mac_address": "3C:61:05:03:AB:2C", "rssi": -41, "ssid": "home",
    "bssid": "06:ED:DA:FE:B4:68", "channel": 11, "subnet_mask": "255.255.255.0", "gateway_ip": "10.10.10.1",
    "dns_ip_1": "10.10.10.1", "dns_ip_2": "0.0.0.0"
};
const list_networks = {
    "networks": [
        { "rssi": -40, "ssid": "", "bssid": "FC:EC:DA:FD:B4:68", "channel": 11, "encryption_type": 3 },
        { "rssi": -41, "ssid": "home", "bssid": "02:EC:DA:FD:B4:68", "channel": 11, "encryption_type": 3 },
        { "rssi": -42, "ssid": "", "bssid": "06:EC:DA:FD:B4:68", "channel": 11, "encryption_type": 3 },
        { "rssi": -73, "ssid": "", "bssid": "FC:EC:DA:17:D4:7E", "channel": 1, "encryption_type": 3 },
        { "rssi": -73, "ssid": "office", "bssid": "02:EC:DA:17:D4:7E", "channel": 1, "encryption_type": 3 },
        { "rssi": -75, "ssid": "Erica", "bssid": "C8:D7:19:9A:88:BD", "channel": 2, "encryption_type": 3 },
        { "rssi": -75, "ssid": "", "bssid": "C6:C9:E3:FF:A5:DE", "channel": 2, "encryption_type": 3 },
        { "rssi": -76, "ssid": "Bruin", "bssid": "C0:C9:E3:FF:A5:DE", "channel": 2, "encryption_type": 3 },
    ]
};

// OTA
const OTA_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "otaSettings";
const ota_settings = {
    "enabled": true, "port": 8266, "password": "ems-esp-neo"
};

// MQTT
const MQTT_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "mqttSettings";
const MQTT_STATUS_ENDPOINT = ENDPOINT_ROOT + "mqttStatus";
const mqtt_settings = {
    "enabled": true, "host": "192.168.1.4", "port": 1883, "base": "ems-esp32", "username": "", "password": "",
    "client_id": "ems-esp32", "keep_alive": 60, "clean_session": true, "max_topic_length": 128,
    "publish_time_boiler": 10, "publish_time_thermostat": 10, "publish_time_solar": 10, "publish_time_mixer": 10,
    "publish_time_other": 10, "publish_time_sensor": 10, "mqtt_qos": 0, "mqtt_retain": false, "dallas_format": 1,
    "bool_format": 1, "ha_climate_format": 1, "ha_enabled": true, "nested_format": 1, "subscribe_format": 0
};
const mqtt_status = {
    "enabled": true, "connected": true, "client_id": "ems-esp32", "disconnect_reason": 0, "mqtt_fails": 0
};

// SYSTEM
const FEATURES_ENDPOINT = ENDPOINT_ROOT + "features";
const VERIFY_AUTHORIZATION_ENDPOINT = ENDPOINT_ROOT + "verifyAuthorization";
const SYSTEM_STATUS_ENDPOINT = ENDPOINT_ROOT + "systemStatus";
const SECURITY_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "securitySettings";
const RESTART_ENDPOINT = ENDPOINT_ROOT + "restart";
const FACTORY_RESET_ENDPOINT = ENDPOINT_ROOT + "factoryReset";
const UPLOAD_FIRMWARE_ENDPOINT = ENDPOINT_ROOT + "uploadFirmware";
const SIGN_IN_ENDPOINT = ENDPOINT_ROOT + "signIn";
const GENERATE_TOKEN_ENDPOINT = ENDPOINT_ROOT + "generateToken";
const system_status = {
    "esp_platform": "ESP32", "max_alloc_heap": 113792, "psram_size": 0, "free_psram": 0, "cpu_freq_mhz": 240,
    "free_heap": 193340, "sdk_version": "v3.3.5-1-g85c43024c", "flash_chip_size": 4194304, "flash_chip_speed": 40000000,
    "fs_total": 65536, "fs_used": 16384, "uptime": "000+00:15:42.707"
};
const security_settings = {
    "jwt_secret": "naughty!", "users": [{ "username": "admin", "password": "admin", "admin": true }, { "username": "guest", "password": "guest", "admin": false }]
};
const features = {
    "project": true, "security": true, "mqtt": true, "ntp": true, "ota": true, "upload_firmware": true
};
const verify_authentication = { access_token: '1234' };
const signin = {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiYWRtaW4iOnRydWUsInZlcnNpb24iOiIzLjAuMmIwIn0.MsHSgoJKI1lyYz77EiT5ZN3ECMrb4mPv9FNy3udq0TU"
};
const generate_token = { token: '1234' };

// EMS-ESP Project specific
const EMSESP_SETTINGS_ENDPOINT = ENDPOINT_ROOT + "emsespSettings";
const EMSESP_ALLDEVICES_ENDPOINT = ENDPOINT_ROOT + "allDevices";
const EMSESP_SCANDEVICES_ENDPOINT = ENDPOINT_ROOT + "scanDevices";
const EMSESP_DEVICEDATA_ENDPOINT = ENDPOINT_ROOT + "deviceData";
const EMSESP_STATUS_ENDPOINT = ENDPOINT_ROOT + "emsespStatus";
const EMSESP_BOARDPROFILE_ENDPOINT = ENDPOINT_ROOT + "boardProfile";
const WRITE_VALUE_ENDPOINT = ENDPOINT_ROOT + "writeValue";
const emsesp_settings = {
    "tx_mode": 1, "tx_delay": 0, "ems_bus_id": 11, "syslog_enabled": false, "syslog_level": 3,
    "trace_raw": false, "syslog_mark_interval": 0, "syslog_host": "192.168.1.4", "syslog_port": 514,
    "master_thermostat": 0, "shower_timer": true, "shower_alert": false, "rx_gpio": 23, "tx_gpio": 5,
    "dallas_gpio": 3, "dallas_parasite": false, "led_gpio": 2, "hide_led": false, "notoken_api": false,
    "analog_enabled": false, "pbutton_gpio": 0, "board_profile": "S32"
};
const emsesp_alldevices = {
    "devices": [{
        "id": 1, "type": "Thermostat", "brand": "", "name": "RC20/Moduline 300",
        "deviceid": 23, "productid": 77, "version": "03.03"
    }, {
        "id": 2, "type": "Boiler", "brand": "Nefit", "name": "GBx72/Trendline/Cerapur/Greenstar Si/27i",
        "deviceid": 8, "productid": 123, "version": "06.01"
    }, {
        "id": 3, "type": "Controller", "brand": "", "name": "BC10",
        "deviceid": 9, "productid": 190, "version": "01.03"
    }],
    "sensors": []
}
const emsesp_status = {
    "status": 0, "rx_received": 344, "tx_sent": 104, "rx_quality": 100, "tx_quality": 100
};
const emsesp_devicedata_1 = {
    "name": "Thermostat: RC20/Moduline 300",
    "data": [
        "16:28:21 01/04/2021", "", "date/time", "datetime",
        "(0)", "", "error code", "",
        15, "°C", "(hc1) setpoint room temperature", "temp",
        20.5, "°C", "(hc1) current room temperature", "",
        "auto", "", "(hc1) mode", "mode"
    ]
};
const emsesp_devicedata_2 = {
    "name": "Boiler: Nefit GBx72/Trendline/Cerapur/Greenstar Si/27i",
    "data": [
        "off", "", "heating active", "",
        "off", "", "warm water active", "",
        5, "°C", "selected flow temperature", "selflowtemp",
        0, "%", "burner selected max power", "",
        0, "%", "heating pump modulation", "",
        42.7, "°C", "current flow temperature", "",
        39, "°C", "return temperature", "",
        1.2, "bar", "system pressure", "",
        45.3, "°C", "max boiler temperature", "",
        "off", "", "gas", "",
        0, "uA", "flame current", "",
        "off", "", "heating pump", "",
        "off", "", "fan", "",
        "off", "", "ignition", "",
        "on", "", "heating activated", "",
        75, "°C", "heating temperature", "",
        90, "%", "burner pump max power", "",
        55, "%", "burner pump min power", "",
        1, null, "pump delay", "",
        10, null, "burner min period", "",
        0, "%", "burner min power", "",
        75, "%", "burner max power", "",
        -6, "°C", "hysteresis on temperature", "",
        6, "°C", "hysteresis off temperature", "",
        0, "%", "burner current power", "",
        295740, "", "burner # starts", "",
        "344 days 2 hours 8 minutes", null, "total burner operating time", "",
        "279 days 11 hours 55 minutes", null, "total heat operating time", "",
        "2946 days 19 hours 8 minutes", null, "total UBA operating time", "",
        "1C(210) 06.06.2020 12:07", "", "last error code", "",
        "0H", "", "service code", "",
        203, "", "service code number", "",
        "01.01.2012", "", "maintenance set date", "",
        "off", "", "maintenance scheduled", "",
        6000, "hours", "maintenance set time", "",
        60, "°C", "(warm water) selected temperature", "",
        62, "°C", "(warm water) set temperature", "",
        "flow", "", "(warm water) type", "",
        "hot", "", "(warm water) comfort", "",
        40, "", "(warm water) flow temperature offset", "",
        100, "%", "(warm water) max power", "",
        "off", "", "(warm water) circulation pump available", "",
        "3-way valve", "", "(warm water) charging type", "",
        70, "°C", "(warm water) disinfection temperature", "",
        "off", "", "(warm water) circulation pump freq", "",
        "off", "", "(warm water) circulation active", "",
        34.7, "°C", "(warm water) current intern temperature", "",
        0, "l/min", "(warm water) current tap water flow", "",
        34.6, "°C", "(warm water) storage intern temperature", "",
        "on", "", "(warm water) activated", "",
        "off", "", "(warm water) one time charging", "",
        "off", "", "(warm water) disinfecting", "",
        "off", "", "(warm water) charging", "",
        "off", "", "(warm water) recharging", "",
        "on", "", "(warm water) temperature ok", "",
        "off", "", "(warm water) active", "",
        "on", "", "(warm water) heating", "",
        262387, "", "(warm water) # starts", "",
        "64 days 14 hours 13 minutes", null, "(warm water) active time", ""
    ]
};

// NETWORK
app.get(NETWORK_STATUS_ENDPOINT, (req, res) => { res.json(network_status); });
app.get(NETWORK_SETTINGS_ENDPOINT, (req, res) => { res.json(network_settings); });
app.post(NETWORK_SETTINGS_ENDPOINT, (req, res) => { res.json(network_settings); });
app.get(LIST_NETWORKS_ENDPOINT, (req, res) => { res.json(list_networks); });
app.get(SCAN_NETWORKS_ENDPOINT, (req, res) => { res.sendStatus(202); });

// AP
app.get(AP_SETTINGS_ENDPOINT, (req, res) => { res.json(ap_settings); });
app.get(AP_STATUS_ENDPOINT, (req, res) => { res.json(ap_status); });
app.post(AP_SETTINGS_ENDPOINT, (req, res) => { res.json(ap_settings); });

// OTA
app.get(OTA_SETTINGS_ENDPOINT, (req, res) => { res.json(ota_settings); });
app.post(OTA_SETTINGS_ENDPOINT, (req, res) => { res.json(ota_settings); });

// MQTT
app.get(MQTT_SETTINGS_ENDPOINT, (req, res) => { res.json(mqtt_settings); });
app.post(MQTT_SETTINGS_ENDPOINT, (req, res) => { res.json(mqtt_settings); });
app.get(MQTT_STATUS_ENDPOINT, (req, res) => { res.json(mqtt_status); });

// NTP 
app.get(NTP_SETTINGS_ENDPOINT, (req, res) => { res.json(ntp_settings); });
app.post(NTP_SETTINGS_ENDPOINT, (req, res) => { res.json(ntp_settings); });
app.get(NTP_STATUS_ENDPOINT, (req, res) => { res.json(ntp_status); });
app.post(TIME_ENDPOINT, (req, res) => { res.sendStatus(200); });

// SYSTEM
app.get(SYSTEM_STATUS_ENDPOINT, (req, res) => { res.json(system_status); });
app.get(SECURITY_SETTINGS_ENDPOINT, (req, res) => { res.json(security_settings); });
app.post(SECURITY_SETTINGS_ENDPOINT, (req, res) => { res.json(security_settings); });
app.get(FEATURES_ENDPOINT, (req, res) => { res.json(features); });
app.get(VERIFY_AUTHORIZATION_ENDPOINT, (req, res) => { res.json(verify_authentication); });
app.post(RESTART_ENDPOINT, (req, res) => { res.sendStatus(200); });
app.post(FACTORY_RESET_ENDPOINT, (req, res) => { res.sendStatus(200); });
app.post(UPLOAD_FIRMWARE_ENDPOINT, (req, res) => { res.sendStatus(200); });
app.post(SIGN_IN_ENDPOINT, (req, res) => { res.json(signin); });
app.get(GENERATE_TOKEN_ENDPOINT, (req, res) => { res.json(generate_token); });

// EMS-ESP Project stuff
app.get(EMSESP_SETTINGS_ENDPOINT, (req, res) => { res.json(emsesp_settings); });
app.post(EMSESP_SETTINGS_ENDPOINT, (req, res) => { res.json(emsesp_settings); });
app.get(EMSESP_ALLDEVICES_ENDPOINT, (req, res) => { res.json(emsesp_alldevices); });
app.post(EMSESP_SCANDEVICES_ENDPOINT, (req, res) => { res.sendStatus(200); });
app.get(EMSESP_STATUS_ENDPOINT, (req, res) => { res.json(emsesp_status); });
app.post(EMSESP_DEVICEDATA_ENDPOINT, (req, res) => {
    const id = req.body.id;
    if (id == 1) {
        res.json(emsesp_devicedata_1);
    }
    if (id == 2) {
        res.json(emsesp_devicedata_2);
    }
});

app.post(WRITE_VALUE_ENDPOINT, (req, res) => {
    const devicevalue = req.body.devicevalue;

    console.log(devicevalue);

    res.sendStatus(200);
});

app.post(EMSESP_BOARDPROFILE_ENDPOINT, (req, res) => {
    const board_profile = req.body.code;

    const data = {
        led_gpio: 1,
        dallas_gpio: 2,
        rx_gpio: 3,
        tx_gpio: 4,
        pbutton_gpio: 5
    };

    if (board_profile == "S32") { // BBQKees Gateway S32
        data.led_gpio = 2;
        data.dallas_gpio = 18;
        data.rx_gpio = 23;
        data.tx_gpio = 5;
        data.pbutton_gpio = 0;
    } else if (board_profile == "E32") { // BBQKees Gateway E32
        data.led_gpio = 2;
        data.dallas_gpio = 4;
        data.rx_gpio = 5;
        data.tx_gpio = 17;
        data.pbutton_gpio = 33;
    } else if (board_profile == "MH-ET") { // MH-ET Live D1 Mini
        data.led_gpio = 2;
        data.dallas_gpio = 18;
        data.rx_gpio = 23;
        data.tx_gpio = 5;
        data.pbutton_gpio = 0;
    } else if (board_profile == "NODEMCU") { // NodeMCU 32S
        data.led_gpio = 2;
        data.dallas_gpio = 18;
        data.rx_gpio = 23;
        data.tx_gpio = 5;
        data.pbutton_gpio = 0;
    } else if (board_profile == "LOLIN") {// Lolin D32
        data.led_gpio = 2;
        data.dallas_gpio = 18;
        data.rx_gpio = 17;
        data.tx_gpio = 16;
        data.pbutton_gpio = 0;
    } else if (board_profile == "OLIMEX") {// Olimex ESP32-EVB (uses U1TXD/U1RXD/BUTTON, no LED or Dallas)
        data.led_gpio = 0;
        data.dallas_gpio = 0;
        data.rx_gpio = 36;
        data.tx_gpio = 4;
        data.pbutton_gpio = 34;
        // data = { 0, 0, 36, 4, 34};
    } else if (board_profile == "TLK110") {// Generic Ethernet (TLK110)
        data.led_gpio = 2;
        data.dallas_gpio = 4;
        data.rx_gpio = 5;
        data.tx_gpio = 17;
        data.pbutton_gpio = 33;
    } else if (board_profile == "LAN8720") {// Generic Ethernet (LAN8720)
        data.led_gpio = 2;
        data.dallas_gpio = 4;
        data.rx_gpio = 5;
        data.tx_gpio = 17;
        data.pbutton_gpio = 33;
    }

    res.json(data);

});

app.listen(port);
console.log(`Mock API Server is up and running at: http://localhost:${port}`);