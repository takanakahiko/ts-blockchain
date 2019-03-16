import * as WebSocket from 'ws'

var p2p_port = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 6001
var initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []

export default class P2pServer {
  public messageHandler = (_: string) => {}
  private sockets: WebSocket[] = []
  constructor() {
    this.connectToPeers(initialPeers)
    this.initP2PServer()
  }
  private connectToPeers(newPeers) {
    newPeers.forEach(peer => {
      var ws = new WebSocket(peer)
      ws.on('open', () => this.initConnection(ws))
      ws.on('error', () => console.log('connection failed'))
    })
  }
  private initP2PServer() {
    var server = new WebSocket.Server({ port: p2p_port })
    server.on('connection', ws => this.initConnection(ws))
    console.log('listening websocket p2p port on: ' + p2p_port)
  }
  private initConnection(ws: WebSocket) {
    this.sockets.push(ws)
    this.initMessageHandler(ws)
    this.initErrorHandler(ws)
  }
  private initMessageHandler(ws: WebSocket) {
    ws.on('message', data => {
      this.messageHandler(data.toString())
    })
  }
  private initErrorHandler(ws: WebSocket) {
    var closeConnection = ws => {
      console.log('connection failed to peer: ' + ws.url)
      this.sockets.splice(this.sockets.indexOf(ws), 1)
    }
    ws.on('close', () => closeConnection(ws))
    ws.on('error', () => closeConnection(ws))
  }
  private write(ws: WebSocket, message: any) {
    ws.send(JSON.stringify(message))
  }
  broadcast(message: any) {
    this.sockets.forEach(socket => this.write(socket, message))
  }
}
