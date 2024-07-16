CREATE TABLE AVALIACAO (
	codigo_avaliacao INT AUTO_INCREMENT,
    data_avaliacao DATE NOT NULL,
	tipo_avaliacao VARCHAR(25) NOT NULL,
    PRIMARY KEY (codigo_avaliacao)
);

ALTER TABLE AVALIACAO
ADD CONSTRAINT ck_tipo_avaliacao
CHECK (tipo_avaliacao IN ('1°BIM - SÁBADO', '2°BIM - SÁBADO', '1°BIM - SEGUNDA-FEIRA', '2°BIM - SEGUNDA-FEIRA', '1°BIM - SUB', '2°BIM - SUB'));
