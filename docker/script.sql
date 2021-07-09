CRETE DATABASE IF NOT EXISTS projectgazin;
USE projectgazin;

CRETE TABLE IF NOT EXISTS usuario(
    id INT(11) AUTO_INCREMENT,
    nome VARCHAR(255),
    sexo CHAR(255),
    idade INTEGER(2),
    hobby VARCHAR(255),
    datanascimento date
    PRIMARY KEY (id)
);
INSERT INTO usuario VALUE(0, 'Flavio','masculino', 20,'jogar', 2000-10-30);
INSERT INTO usuario VALUE(0,'Carolina Aguera', 'feminino', 19,'programar', 2002-01-12);

