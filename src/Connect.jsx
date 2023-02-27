import { Peer, connectTo } from './peer';

export default function Connect() {
  const onConnect = (ev) => {
    ev.preventDefault();
    const peerIdComponent = ev.target.querySelector('input[name="peerId"]');
    const peerId = peerIdComponent.value; peerIdComponent.value = '';
    connectTo(peerId);
  }

  return (
    <div className="Connect">
      <div onClick={() => navigator.clipboard.writeText(Peer.id)}>
        {Peer.id}
      </div>
      <form onSubmit={onConnect}>
        <label>
          Peer ID:
        <input type="text" name="peerId" />
        </label>
        <input type="submit" value="Connect" />
      </form>
    </div>
  );
}
