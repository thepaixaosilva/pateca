CREATE TABLE FOLHA_DE_RESPOSTAS (
	codigo_respostas INT AUTO_INCREMENT,
    resposta_1 CHAR(1) NOT NULL,
    resposta_2 CHAR(1) NOT NULL,
    resposta_3 CHAR(1) NOT NULL, 
    resposta_4 CHAR(1) NOT NULL, 
    resposta_5 CHAR(1) NOT NULL,
    nota INT NOT NULL,
	codigo_gabarito INT REFERENCES GABARITO_OFICIAL(codigo_gabarito) ON DELETE CASCADE,
    ra CHAR(13) REFERENCES ALUNO(ra) ON DELETE CASCADE,
    PRIMARY KEY (codigo_respostas)
);

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp1
CHECK (resposta_1 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp2
CHECK (resposta_2 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp3
CHECK (resposta_3 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp4
CHECK (resposta_4 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE FOLHA_DE_RESPOSTAS
ADD CONSTRAINT ck_resp5
CHECK (resposta_5 IN ('A', 'B', 'C', 'D', 'E'));
