INSERT INTO api_ubicacion (ubicacion_id, referencia, latitud, longitud)
VALUES
(5, '...', '-12.062481490645037000', '-77.078444182593260000'),
(6, '...', '-11.980322743578196000', '-77.101707415077390000'),
(7, '...', '-11.984586921366269000', '-77.103081791561080000'),
(8, '...', '-11.970690577693064000', '-77.099478813068940000'),
(9, '...', '-12.081440117048630000', '-77.062731381670630000'),
(10, '...', '-12.078512812831123000', '-77.071071605829430000'),
(11, '...', '-12.077170446817863000', '-77.059055624934420000'),
(12, '...', '-12.031937446468431000', '-77.041204176503920000'),
(13, '...', '-12.029248603687375000', '-77.047978005687430000'),
(14, '...', '-12.033990238838655000', '-77.038493095761640000'),
(15, '...', '-12.027654232019977000', '-77.047633675786880000'),
(16, '...', '-12.063493078271703000', '-77.024818887669620000'),
(17, '...', '-12.068948402546471000', '-77.035024730962520000'),
(18, '...', '-12.065087099867025000', '-77.035622682087830000'),
(19, '...', '-12.101836962486919000', '-77.004491117300830000'),
(20, '...', '-12.103944711041569000', '-76.997340059391060000'),
(21, '...', '-12.117862777055796000', '-76.995473092069590000'),
(22, '...', '-12.143810031823750000', '-77.004283923955750000'),
(23, '...', '-12.090773232216268000', '-77.071837772191430000'),
(24, '...', '-12.099069563427712000', '-77.060171132661500000'),
(25, '...', '-12.092067745018387000', '-77.060441488455110000'),
(26, '...', '-12.056775965889670000', '-77.123955494138540000'),
(27, '...', '-12.058111765009734000', '-77.131521070155190000'),
(28, '...', '-12.058498088991300000', '-77.138728878339020000'),
(29, '...', '-12.041081466263096000', '-77.074590884561460000');

INSERT INTO api_pedido (pedido_id, pedido_registro, pedido_peso, pedido_volumen, pedido_precio, pedido_fallos, cliente_id_id, pedido_estado_id, ubicacion_id_id)
VALUES
(1, '2024-12-03', '14.00', '12.00', '100.00', '0', 1, 2, 5),
(2, '2024-12-03', '20.00', '3.00', '100.00', '0', 1, 2, 6),
(3, '2024-12-03', '20.00', '15.00', '100.00', '0', 1, 2, 7),
(4, '2024-12-03', '25.00', '15.00', '100.00', '0', 1, 2, 8),
(5, '2024-12-03', '35.00', '15.00', '100.00', '0', 1, 2, 9),
(6, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 10),
(7, '2024-12-03', '10.00', '20.00', '100.00', '0', 1, 2, 11),
(8, '2024-12-03', '25.00', '15.00', '100.00', '0', 1, 2, 12),
(9, '2024-12-03', '12.00', '6.00', '100.00', '0', 1, 2, 13),
(10, '2024-12-03', '20.00', '10.00', '100.00', '0', 1, 2, 14),
(11, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 15),
(12, '2024-12-03', '12.00', '5.00', '100.00', '0', 1, 2, 16),
(13, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 17),
(14, '2024-12-03', '15.00', '5.00', '100.00', '0', 1, 2, 18),
(15, '2024-12-03', '5.00', '6.00', '100.00', '0', 1, 2, 19),
(16, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 20),
(17, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 21),
(18, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 22),
(19, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 23),
(20, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 24),
(21, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 25),
(22, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 26),
(23, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 27),
(24, '2024-12-03', '15.00', '10.00', '100.00', '0', 1, 2, 28),
(25, '2024-12-03', '20.00', '20.00', '100.00', '0', 1, 2, 29);
