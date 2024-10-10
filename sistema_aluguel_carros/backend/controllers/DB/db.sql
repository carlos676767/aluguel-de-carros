CREATE TABLE PESSOAS(
Personid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
NOME VARCHAR(255) NOT NULL,
EMAIL_USUARIO varchar(255) UNIQUE NOT NULL,
SENHA VARCHAR(255) NOT NULL,
TELEFONE VARCHAR(255) NOT NULL,
CPF CHAR(11) NOT NULL
)


CREATE TABLE CARROS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    MODELO VARCHAR(255) NOT NULL,
    MARCA VARCHAR(255) NOT NULL,
    PRECO REAL NOT NULL,
    IMAGEM VARCHAR(255) NOT NULL,
    DISPONIBILIDADE TEXT CHECK(status IN ('disponivel', 'nao disponivel')),
    PLACA VARCHAR(255) NOT NULL,
    ANO TEXT NOT NULL
)

CREATE TABLE RESERVAS (
    Personid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    USUARIOID INTEGER NOT NULL,
    CARROID INTEGER NOT NULL,
    DATA TEXT,
    status TEXT CHECK(status IN ('pendente', 'confirmada', 'cancelado')) NOT NULL,
    FOREIGN KEY (USUARIOID) REFERENCES PESSOAS(Personid) ON DELETE CASCADE,
    FOREIGN KEY (CARROID) REFERENCES CARROS(ID) ON DELETE CASCADE
);


CREATE TABLE APISKEY(
    API_KEY VARCHAR(255) UNIQUE,
    
)