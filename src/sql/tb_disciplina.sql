CREATE TABLE DISCIPLINA (
	codigo_disciplina CHAR(6),
    nome_disciplina VARCHAR(30) NOT NULL,
    semestre_disciplina CHAR(1) NOT NULL, 
    PRIMARY KEY (codigo_disciplina)
);

ALTER TABLE DISCIPLINA
ADD CONSTRAINT ck_semestre_disciplina
CHECK (semestre_disciplina IN ('1', '2', '3', '4', '5', '6'));
