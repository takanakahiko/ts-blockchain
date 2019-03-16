import * as WebSocket from 'ws'

const p2p_port = process.env.P2P_PORT ? parseInt(process.env.P2P_PORT) : 6001
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []

export default class P2pServer {
  public messageHandler = (_: string) => {}
  private sockets: WebSocket[] = []
  constructor() {
    this.connectToPeers(initialPeers)
    const server = new WebSocket.Server({ port: p2p_port })
    server.on('connection', ws => this.initConnection(ws))
    console.log('listening websocket p2p port on: ' + p2p_port)
  }
  connectToPeers(newPeers) {
    newPeers.forEach(peer => {
      const ws = new WebSocket(peer)
      ws.on('open', () => this.initConnection(ws))
      ws.on('error', () => console.log('connection failed'))
    })
  }
  private initConnection(ws: WebSocket) {
    this.sockets.push(ws)
    ws.on('message', data => this.messageHandler(data.toString()))
    const closeConnection = ws => {
      console.log('connection failed to peer: ' + ws.url)
      this.sockets.splice(this.sockets.indexOf(ws), 1)
    }
    ws.on('close', () => closeConnection(ws))
    ws.on('error', () => closeConnection(ws))
  }
  broadcast(message: string) {
    this.sockets.forEach(socket => socket.send(message))
  }
}
