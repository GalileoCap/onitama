import { useSelector, useDispatch } from 'react-redux';
import { pushMsg } from './messagesSlice';
import { Conn } from './peer';

export default function Messages() {
  const messages = useSelector((state) => state.messages.value);
  const dispatch = useDispatch();

  const onSend = (ev) => {
    ev.preventDefault();
    const textComponent = ev.target.querySelector('input[name="text"]');
    const text = textComponent.value || 'ping'; textComponent.value = '';

    dispatch(pushMsg(text));
    Conn.send({type: 'msg', text});
  }

  return (
    <div className="Messages">
      {messages.map((msg, i) => <p key={i}>> {msg}</p>)}

      <form onSubmit={onSend}>
        <input type="text" name="text" />
        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
}
