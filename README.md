# angular-mqtt
A sample angular application which uses MQTT connection.

#### Live Demo: https://mqtt.enezir.com

### Requirements:
*NodeJS (https://nodejs.org/en/)

*Angular (https://cli.angular.io/)

### Build Instructions
```
npm -i
```
```
ng serve
```

### Configuration
Do not forget set your own mqtt configuration from environment.ts.
````
export const environment = {
  production: false,
  mqtt: {
    host: 'xxxxx',
    clientId: 'xxx',
    topic: 'xxx',
    protocol: "wss",
    path: 'xxx',
		port: xxxx,
    userName: '',
    password: '',
  }
};
````
