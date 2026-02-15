# Guida Server Side 
La guida server side fornisce istruzioni su come configurare l'applicazione MusicVirus lato server.

### Requisiti
Prima di iniziare, assicurati di avere i seguenti requisiti:
- Repository Git clonato sul tuo sistema.
- Docker installato sul tuo sistema.
- Files di configurazione .service.env nella directory root di ogni microservizio.
- Docker Compose file `docker-compose.yml` nella directory root del progetto.

### Configurazione d'ambiente dei Microservizi
Ogni microservizio richiede un file di configurazione `.service.env` nella sua directory.
Il file dovrà contenere le variabili d'ambiente necessarie per il funzionamento del microservizio, le quali sono:
- **JWT_SECRET_B64** : Una stringa segreta codificata in Base64 utilizzata per la firma dei token JWT.
- **JWT_ISSUER** : L'emittente dei token JWT.
- **JWT_EXPIRATION_MS** : La durata di validità dei token JWT in millisecondi.
- **RABBIT_HOST** : L'host del server RabbitMQ.
- **MONGO_URI** : L'URI di connessione al database MongoDB.

Le variabili d'ambiente sono uguali per ogni microservizio, tranne per la variabile **MONGO_URI**,
che deve essere configurata in base al database specifico utilizzato da ciascun microservizio, il formato della variabile
è il seguente:
```
MONGO_URI=mongodb://<mongo_container_name>:<port>/<database
```
I valori da inserire per ogni microservizio sono:
```
MONGO_URI=mongodb://mongo-billing-db:27017/billing_db
```
```
MONGO_URI=mongodb://event-fundraising-mongo-db:27017/event_fundraising_db
```
```
MONGO_URI=mongodb://user-identity-mongo-db:27017/user_identity_db
```

### Docker compose
Il file `docker-compose.yml` nella directory root del progetto (es. `/music-virus-be`)
definisce i servizi Docker necessari per eseguire l'applicazione MusicVirus.

## Avvio dei Microservizi
Per avviare i microservizi, esegui il seguente comando nella directory root del progetto:
```bash
docker-compose up -d --build
```


# Guida client side
La guida client side fornisce istruzioni su come configurare l'applicazione MusicVirus lato client, ovvero il frontend.

### Requisiti
Prima di iniziare, assicurati di avere i seguenti requisiti:
- Repository Git clonato sul tuo sistema.
- Node.js: v20.13.1
- npm: v10.5.2
- File di configurazione `.env.localdev` e `.env.oracle` nella directory root del progetto frontend.

### Avvio dell'applicazione frontend in ambiente di sviluppo
1. Naviga nella directory del progetto frontend:
   ```bash
   cd music-virus-web
   ```
2. Installa le dipendenze del progetto:
   ```bash
   npm install
   ```
3. Avvia l'applicazione in modalità di sviluppo con docker engine attivo e il backend in esecuzione:
   ```bash
   npm run dev:local
    ``` 

L'applicazione sarà accessibile all'indirizzo `http://localhost:5173`.