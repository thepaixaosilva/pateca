CREATE TABLE ALUNO (
	ra CHAR(13),
    cpf CHAR(11) UNIQUE NOT NULL,
    nome_aluno VARCHAR(40) NOT NULL,
    data_nascimento DATE NOT NULL,
    PRIMARY KEY (ra)
);

ALTER TABLE ALUNO
ADD CONSTRAINT ck_data_nascimento
CHECK (data_nascimento >= '1900-01-01');
