package chat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import objetos.DecoderMensaje;
import objetos.EncoderMensaje;
import objetos.Mensaje;

@ServerEndpoint(value = "/chat", encoders = {EncoderMensaje.class}, decoders = {DecoderMensaje.class})
public class Chat {

    private static final List<Session> conectados = new ArrayList<>();

    @OnOpen
    public void OnOpen(Session session) {
        conectados.add(session);
    }

    @OnClose
    public void OnClose(Session session) {
        conectados.remove(session);
    }

    @OnMessage
    public void Message(Mensaje mensaje) throws IOException, EncodeException {
        for (Session session : conectados) {
            session.getBasicRemote().sendObject(mensaje);
        }
    }

}
