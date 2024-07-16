CREATE TABLE GABARITO_OFICIAL (
	codigo_gabarito INT AUTO_INCREMENT,
    questao_1 CHAR(1) NOT NULL,
    questao_2 CHAR(1) NOT NULL,
    questao_3 CHAR(1) NOT NULL, 
    questao_4 CHAR(1) NOT NULL, 
    questao_5 CHAR(1) NOT NULL,
    codigo_disciplina CHAR(6) NOT NULL REFERENCES DISCIPLINA(codigo_disciplina) ON DELETE CASCADE,
    codigo_avaliacao INT REFERENCES AVALIACAO(codigo_avaliacao) ON DELETE CASCADE,
    PRIMARY KEY (codigo_gabarito)
);

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q1
CHECK (questao_1 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q2
CHECK (questao_2 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q3
CHECK (questao_3 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q4
CHECK (questao_4 IN ('A', 'B', 'C', 'D', 'E'));

ALTER TABLE GABARITO_OFICIAL
ADD CONSTRAINT ck_q5
CHECK (questao_5 IN ('A', 'B', 'C', 'D', 'E'));
