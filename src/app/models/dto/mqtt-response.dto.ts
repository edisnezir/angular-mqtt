export interface MqttResponse {
    activeSubscriptions: number;
    connected: number;
    disconnected: number;
    maxConnected: number;
    messageBytesReceived: number;
    messageBytesSent: number;
    messageDropped: number;
    messageReceived: number;
    messageSent: number;
    offlineSessions: number;
    packetReceived: number;
    packetSent: number;
    pendingMessages: number;
    rejected: number;
    retainedMessages: number;
    subscribed: number;
    unsubscribed: number;
    time: Date | null;
}
