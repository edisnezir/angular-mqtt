import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import * as mqtt from 'mqtt';

import { environment } from 'src/environments/environment';
export enum TransportState {
  CLOSED,
  TRYING,
  CONNECTED,
  SUBSCRIBED,
  DISCONNECTING
}

@Injectable()
export class EventMqttService {
  public state: BehaviorSubject<TransportState>;
  public messages: Subject<mqtt.Packet>;
  private client: mqtt.Client;
  private resolvePromise: (...args: any[]) => void;

  constructor() {
    this.messages = new Subject<mqtt.Packet>();
    this.state = new BehaviorSubject<TransportState>(TransportState.CLOSED);
  }

  try_connect(): Promise<{}> {
    if (this.state.getValue() !== TransportState.CLOSED) {
      throw Error('Connection is not closed!');
    }
    if (this.client === null) {
      throw Error('Client not configured!');
    }

    const options: mqtt.IClientOptions = {
      'keepalive': 1,
      'clientId': 'clientid_' + Math.floor(Math.random() * 65535),
      'username': environment.mqtt.userName,
      'password': environment.mqtt.password
    };

    const url = environment.mqtt.protocol + '://' + environment.mqtt.host + ':' + environment.mqtt.port + '/' + environment.mqtt.path;

    this.client = mqtt.connect(url, options);

    this.client.addListener('connect', this.on_connect);
    this.client.addListener('reconnect', this.on_reconnect);
    this.client.addListener('message', this.on_message);
    this.client.addListener('offline', this.on_error);
    this.client.addListener('error', this.on_error);

    this.state.next(TransportState.TRYING);

    return new Promise(
      (resolve, reject) => this.resolvePromise = resolve
    );
  }

  disconnect(): void {
    this.state.next(TransportState.DISCONNECTING);

    if (this.client) {
      this.client.end(
        false,
        () => this.state.next(TransportState.CLOSED)
      );
    }
  }

  subscribe(): void {
    this.client.subscribe(environment.mqtt.topic);
    this.state.next(TransportState.SUBSCRIBED);
  }


  debug(...args: any[]) {
    if (console && console.log && console.log.apply) {
      console.log.apply(console, args);
    }
  }

  on_reconnect = () => {
    this.debug('on_reconnect');
  }

  on_connect = () => {

    this.debug('connected');

    this.state.next(TransportState.CONNECTED);

    this.subscribe();

    this.debug(typeof this.resolvePromise);

    this.resolvePromise();

    this.resolvePromise = null;
  }


  on_error = (error: any) => {
    console.error('on_error');
    console.error(error);

    if (typeof error === 'undefined') {
      this.debug('Undefined error');
      this.state.next(TransportState.TRYING);
      return;
    }

    if (error.indexOf('Lost connection') !== -1) {
      this.state.next(TransportState.CLOSED);
    }
  }


  public on_message = (...args: any[]) => {

    const topic = args[0],
      message = args[1],
      packet: mqtt.Packet = args[2];

    this.debug(topic);
    this.debug(message);

    if (message.toString()) {
      this.messages.next(message);
    } else {
      console.warn('Empty message received!');
    }
  }
}