import { Component, OnInit } from '@angular/core';
import { Packet } from 'mqtt';
import { Observable } from 'rxjs';
import { MqttResponse } from 'src/app/models/dto/mqtt-response.dto';

import { EventMqttService } from 'src/app/services/event-mqtt.service';

@Component({
    selector: 'app-chart-dashboard',
    templateUrl: './chart-dashboard.component.html',
    styleUrls: ['./chart-dashboard.component.scss'],
    providers: [EventMqttService]
})
export class ChartDashboardComponent implements OnInit {
    messages: Observable<Packet>;
    lastMessage: MqttResponse;
    allMessageData: Array<MqttResponse> = [];
    connectionStats: any = [
        { title: 'Connected Clients', value: 0 },
        { title: 'Disconnected Clients', value: 0 },
    ]
    clientStats: any = [
        {title: ''}
    ]

    count = 0;

    constructor(private _mqService: EventMqttService) { }

    ngOnInit() {

        this._mqService.try_connect()
            .then(this.on_connect)
            .catch(this.on_error);
    }

    ngOnDestroy() {
        this._mqService.disconnect();
    }

    on_connect = () => {
        this.messages = this._mqService.messages;
        this.messages.subscribe(this.on_next);
    }

    on_next = (message: Packet) => {
        let mappedMessage: MqttResponse = JSON.parse(message.toString());
        mappedMessage.time = new Date();
        this.allMessageData.push(mappedMessage);
        this.lastMessage = mappedMessage;

        this.connectionStats = [
            { title: 'Connected Clients', value: mappedMessage.connected },
            { title: 'Disconnected Clients', value: mappedMessage.connected },
        ]


        this.count++;
    }

    on_error = () => {
        console.error('Error!');
    }
}
