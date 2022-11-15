-- -------------------------------------------------------------
-- TablePlus 5.1.0(468)
--
-- https://tableplus.com/
--
-- Database: endangered_animals
-- Generation Time: 2022-11-15 16:40:00.3620
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."animals";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS animals_id_seq;
DROP TYPE IF EXISTS "public"."conservation_status";
CREATE TYPE "public"."conservation_status" AS ENUM ('VULNERABLE', 'ENDANGERED', 'CRITICALLY ENDANGERED');

-- Table Definition
CREATE TABLE "public"."animals" (
    "id" int4 NOT NULL DEFAULT nextval('animals_id_seq'::regclass),
    "conservation_status" "public"."conservation_status",
    "region" varchar(100) NOT NULL,
    "population" varchar(30),
    "image" varchar(255),
    "name" varchar(50),
    "class" varchar(20),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."animals_habitats";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS animals_habitats_animals_id_seq;
CREATE SEQUENCE IF NOT EXISTS animals_habitats_habitats_id_seq;

-- Table Definition
CREATE TABLE "public"."animals_habitats" (
    "animals_id" int4 NOT NULL DEFAULT nextval('animals_habitats_animals_id_seq'::regclass),
    "habitats_id" int4 NOT NULL DEFAULT nextval('animals_habitats_habitats_id_seq'::regclass)
);

DROP TABLE IF EXISTS "public"."animals_threats";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS threats_habitats_animals_id_seq;
CREATE SEQUENCE IF NOT EXISTS threats_habitats_threats_id_seq;

-- Table Definition
CREATE TABLE "public"."animals_threats" (
    "animals_id" int4 NOT NULL DEFAULT nextval('threats_habitats_animals_id_seq'::regclass),
    "threats_id" int4 NOT NULL DEFAULT nextval('threats_habitats_threats_id_seq'::regclass)
);

DROP TABLE IF EXISTS "public"."habitats";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS habitats_id_seq;

-- Table Definition
CREATE TABLE "public"."habitats" (
    "id" int4 NOT NULL DEFAULT nextval('habitats_id_seq'::regclass),
    "name" varchar(20),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."threats";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS threats_id_seq;

-- Table Definition
CREATE TABLE "public"."threats" (
    "id" int4 NOT NULL DEFAULT nextval('threats_id_seq'::regclass),
    "name" varchar(40),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."user_accounts";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_accounts" (
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" varchar(15) NOT NULL,
    "email" varchar(50) NOT NULL,
    "password" varchar(100) NOT NULL,
    "country" varchar(50) NOT NULL,
    "is_admin" bool DEFAULT false,
    PRIMARY KEY ("uuid")
);

DROP TABLE IF EXISTS "public"."users_favourites";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_favourites_animals_id_seq;

-- Table Definition
CREATE TABLE "public"."users_favourites" (
    "user_id" uuid NOT NULL,
    "animals_id" int4 NOT NULL DEFAULT nextval('users_favourites_animals_id_seq'::regclass)
);

INSERT INTO "public"."animals" ("id", "conservation_status", "region", "population", "image", "name", "class") VALUES
(1, 'ENDANGERED', 'Bhutan, China, India, Myanmar, Nepal', '10000', 'https://wir.iucnredlist.org/ailurus-fulgens2.jpg', 'Red Panda', 'Mammal'),
(2, 'CRITICALLY ENDANGERED', 'Western & Central Africa', '415000', 'https://wir.iucnredlist.org/MFxxwnxv-df6qSb-cQd.jpg', 'African Forest Elephant', 'Mammal'),
(3, 'ENDANGERED', 'Democratic Republic of Congo', '10000-35000', 'https://wir.iucnredlist.org/okapia-johnstoni.jpg', 'Okapi', 'Mammal'),
(4, 'ENDANGERED', 'United States of America', '632', 'https://wir.iucnredlist.org/monachus-schauinslandi.JPG', 'Hawaiian Monk Seal', 'Mammal'),
(5, 'VULNERABLE', 'Middle East', '1220', 'https://wir.iucnredlist.org/oryx-leucoryx.jpg', 'Arabian Oryx', 'Mammal'),
(6, 'CRITICALLY ENDANGERED', 'Australia', '2250', 'https://wir.iucnredlist.org/burramys-parvus.jpg', 'Mountain Pygmy Possum', 'Mammal'),
(7, 'VULNERABLE', 'Australia', '100000-500000', 'https://wir.iucnredlist.org/821856896.jpg', 'Koala', 'Mammal'),
(8, 'CRITICALLY ENDANGERED', 'Southeast Asia', 'Insufficient Data', 'https://wir.iucnredlist.org/manis-javanica.jpg', 'Sunda Pangolin', 'Mammal'),
(9, 'VULNERABLE', 'Côte d''Ivoire, Guinea, Liberia, Sierra Leone', '9500', 'https://wir.iucnredlist.org/1151488349.jpg', 'Zebra Duiker', 'Mammal'),
(10, 'ENDANGERED', 'Brazil', '1400', 'https://wir.iucnredlist.org/1220063315.jpg', 'Golden Lion Tamarin', 'Mammal'),
(11, 'VULNERABLE', 'Asia', '3700-5580', 'https://wir.iucnredlist.org/1444066785.jpg', 'Clouded Leopard', 'Mammal'),
(12, 'CRITICALLY ENDANGERED', 'United States of America', '26', 'https://wir.iucnredlist.org/GDB6Sb16-dj28MZ-59n.jpg', 'Rice''s Whale', 'Mammal'),
(13, 'CRITICALLY ENDANGERED', 'Mexico', '192', 'https://wir.iucnredlist.org/procyon-pygmaeus.jpg', 'Pygmy Raccoon', 'Mammal'),
(14, 'VULNERABLE', 'South America', 'Insufficient Data', 'https://wir.iucnredlist.org/priodontes-maximus.jpg', 'Giant Armadillo', 'Mammal'),
(15, 'CRITICALLY ENDANGERED', 'Southern & Central Africa', '3142', 'https://wir.iucnredlist.org/diceros-bicornis.jpg', 'Black Rhino', 'Mammal'),
(16, 'CRITICALLY ENDANGERED', 'Canada', '90', 'https://wir.iucnredlist.org/marmota-vancouverensis.jpg', 'Vancouver Island Marmot', 'Mammal'),
(17, 'CRITICALLY ENDANGERED', 'South Africa', '157-207', 'https://wir.iucnredlist.org/bunolagus_monticularis.jpg', 'Riverine Rabbit', 'Mammal'),
(18, 'VULNERABLE', 'Argentina, Brazil, Paraguay', '6047', 'https://wir.iucnredlist.org/878808892.jpg', 'Southern Tiger Cat', 'Mammal'),
(19, 'VULNERABLE', 'Indian Ocean, Pacific Ocean', 'Insufficient Data', 'https://wir.iucnredlist.org/Dugong-dugon.jpg', 'Dugong', 'Mammal'),
(20, 'ENDANGERED', 'China', '178', 'https://wir.iucnredlist.org/2065734611.jpg', 'Przewalski''s Horse', 'Mammal'),
(21, 'CRITICALLY ENDANGERED', 'Jamaica', 'Insufficient Data', 'https://wir.iucnredlist.org/ckLvLH5l-dfSW9N-K0J.jpg', 'Portland Ridge Frog', 'Amphibian'),
(22, 'CRITICALLY ENDANGERED', 'India', '300', 'https://wir.iucnredlist.org/726627656.jpg', 'Resplendent Bush Frog', 'Amphibian'),
(23, 'CRITICALLY ENDANGERED', 'New Zealand', '5000-20000', 'https://wir.iucnredlist.org/1347833328.jpg', 'Archey''s Frog', 'Amphibian'),
(24, 'CRITICALLY ENDANGERED', 'Mexico', '50-1000', 'https://wir.iucnredlist.org/ambystoma-mexicanum.jpg', 'Axolotl', 'Amphibian'),
(25, 'CRITICALLY ENDANGERED', 'China', 'Insufficient Data', 'https://wir.iucnredlist.org/andrias-davidianus.jpg', 'Chinese Giant Salamander', 'Amphibian'),
(26, 'VULNERABLE', 'China', '500-1000', 'https://wir.iucnredlist.org/ailuropoda-melanoleuca.jpg', 'Giant Panda', 'Mammal'),
(27, 'VULNERABLE', 'Vanuatu', '2500-10000', 'https://wir.iucnredlist.org/202333709.jpg', 'Vanuatu Scrubfowl', 'Bird'),
(28, 'ENDANGERED', 'Galapagos Islands', '250-1000', 'https://wir.iucnredlist.org/mimus-trifasciatus.jpg', 'Floreana Mockingbird', 'Bird'),
(29, 'ENDANGERED', 'Southern & Central Africa', '6700-67000', 'https://wir.iucnredlist.org/1068004649.jpg', 'Secretarybird', 'Bird'),
(30, 'CRITICALLY ENDANGERED', 'Sao Tome', '130-1700', 'https://wir.iucnredlist.org/bostrychia-bocagei.jpg', 'Dwarf Ibis', 'Bird'),
(31, 'ENDANGERED', 'Honduras', '3760-7360', 'https://wir.iucnredlist.org/ctenosaura-oedirhina.jpg', 'Roatán Spiny-tailed Iguana', 'Reptile'),
(32, 'VULNERABLE', 'Australia', '5000-10000', 'https://wir.iucnredlist.org/NZ2JsFgS-D553wf-dmT.jpg', 'Great Desert Skink', 'Reptile'),
(33, 'ENDANGERED', 'Indonesia', '1383', 'https://wir.iucnredlist.org/varanus-komodoensis.jpg', 'Komodo Dragon', 'Reptile'),
(34, 'CRITICALLY ENDANGERED', 'Spain', 'Insufficient Data', 'https://wir.iucnredlist.org/gallotia-bravoana.jpg', 'La Gomera Giant Lizard', 'Reptile'),
(35, 'VULNERABLE', 'Galapagos Islands', 'Insufficient Data', 'https://wir.iucnredlist.org/5036472.jpg', 'Belted Blenny', 'Ray-finned Fish'),
(36, 'ENDANGERED', 'Australia', 'Insufficient Data', 'https://wir.iucnredlist.org/bSgc0Rf3-D68zb0-rj8.jpg', 'Utchee Creek Rainbowfish', 'Ray-finned Fish'),
(37, 'CRITICALLY ENDANGERED', 'Georgia, Kazakhstan', '100', 'https://wir.iucnredlist.org/1342976606.jpg', 'Ship Sturgeon', 'Ray-finned Fish'),
(38, 'ENDANGERED', 'Azerbaijan, Iran, Kazakhstan, Russia, Turkmenistan', '68000', 'https://wir.iucnredlist.org/1867148024.jpg', 'Caspian Seal', 'Mammal'),
(39, 'VULNERABLE', 'Indonesia', '10000', 'https://wir.iucnredlist.org/babyrousa-celebensis.jpg', 'Sulawesi Babirusa', 'Mammal'),
(40, 'CRITICALLY ENDANGERED', 'China, Mongolia', '950', 'https://wir.iucnredlist.org/camelus-ferus.jpg', 'Bactrian Camel', 'Mammal'),
(41, 'ENDANGERED', 'Oman, United Arab Emirates', '2202-2324', 'https://wir.iucnredlist.org/arabitragus-jayakari.jpg', 'Arabian Tahr', 'Mammal'),
(42, 'VULNERABLE', 'India, Nepal', '2100-2200', 'https://wir.iucnredlist.org/457617274.jpg', 'Great One-horned Rhino', 'Mammal'),
(43, 'CRITICALLY ENDANGERED', 'Chad, Niger', '30-90', 'https://wir.iucnredlist.org/addax-nasomaculatus.jpg', 'Addax', 'Mammal'),
(44, 'CRITICALLY ENDANGERED', 'Africa', '131000', 'https://wir.iucnredlist.org/necrosyrtes-monachus.jpg', 'Hooded Vulture', 'Bird'),
(45, 'VULNERABLE', 'India', '2500-10000', 'https://wir.iucnredlist.org/DgklKD04-dcBTWT-nqg.jpg', 'Yellow-throated Bulbul', 'Bird'),
(46, 'ENDANGERED', 'Southern & Central Africa', '4800-5700', 'https://wir.iucnredlist.org/f41kRGzm-D21FBv-bLV.jpg', 'Maccoa Duck', 'Bird'),
(47, 'CRITICALLY ENDANGERED', 'Dominican Republic, Haiti', 'Insufficient Data', 'https://wir.iucnredlist.org/eleutherodactylus-nortoni.jpg', 'Spiny Giant Frog', 'Amphibian'),
(48, 'CRITICALLY ENDANGERED', 'Mexico', '2500', 'https://wir.iucnredlist.org/1517165848.jpg', 'Bolson Tortoise', 'Reptile'),
(49, 'VULNERABLE', 'Mexico', '1000-5000', 'https://wir.iucnredlist.org/KDPD6wRS-D5Vfdr-FWn.jpg', 'Piebald Chuckwalla', 'Reptile'),
(50, 'VULNERABLE', 'Middle East', '4500', 'https://wir.iucnredlist.org/2030331812.jpg', 'Nubian Ibex', 'Mammal');

INSERT INTO "public"."animals_habitats" ("animals_id", "habitats_id") VALUES
(2, 1),
(2, 2),
(2, 3),
(3, 1),
(4, 9),
(5, 8),
(6, 3),
(7, 1),
(7, 2),
(8, 1),
(8, 3),
(8, 9),
(8, 10),
(9, 1),
(10, 1),
(11, 1),
(11, 3),
(12, 9),
(13, 1),
(13, 10),
(14, 1),
(14, 2),
(14, 4),
(15, 2),
(15, 3),
(15, 8),
(16, 1),
(16, 4),
(16, 6),
(17, 3),
(18, 1),
(18, 2),
(19, 9),
(20, 4),
(20, 8),
(21, 1),
(21, 7),
(22, 1),
(23, 1),
(24, 5),
(24, 9),
(25, 1),
(25, 5),
(26, 1),
(27, 1),
(28, 3),
(29, 2),
(29, 3),
(29, 4),
(29, 10),
(30, 1),
(30, 5),
(1, 1),
(1, 3),
(31, 1),
(31, 3),
(31, 9),
(31, 10),
(32, 1),
(32, 3),
(32, 4),
(32, 8),
(33, 1),
(33, 2),
(33, 9),
(34, 3),
(34, 6),
(35, 9),
(36, 5),
(37, 5),
(37, 9),
(38, 5),
(39, 1),
(39, 5),
(40, 8),
(41, 3),
(41, 6),
(41, 8),
(42, 1),
(42, 4),
(42, 5),
(43, 2),
(43, 4),
(43, 8),
(44, 1),
(44, 2),
(44, 3),
(44, 4),
(44, 5),
(44, 8),
(44, 10),
(45, 1),
(45, 3),
(45, 6),
(46, 5),
(46, 9),
(47, 1),
(47, 7),
(47, 10),
(48, 3),
(48, 8),
(49, 3),
(49, 8),
(49, 9),
(50, 3),
(50, 6),
(50, 8);

INSERT INTO "public"."animals_threats" ("animals_id", "threats_id") VALUES
(2, 1),
(2, 5),
(2, 6),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(5, 5),
(6, 1),
(6, 3),
(6, 5),
(7, 1),
(7, 2),
(7, 3),
(7, 5),
(8, 1),
(8, 2),
(9, 1),
(9, 2),
(10, 1),
(11, 1),
(11, 2),
(12, 1),
(12, 2),
(12, 4),
(13, 1),
(13, 3),
(13, 5),
(14, 1),
(14, 2),
(15, 1),
(15, 2),
(15, 3),
(16, 2),
(17, 1),
(17, 2),
(17, 3),
(17, 5),
(18, 1),
(18, 2),
(18, 3),
(19, 1),
(19, 2),
(19, 4),
(19, 5),
(20, 1),
(20, 2),
(20, 5),
(21, 1),
(21, 3),
(21, 5),
(22, 7),
(23, 1),
(23, 2),
(23, 3),
(24, 1),
(24, 2),
(24, 3),
(24, 4),
(25, 1),
(25, 2),
(25, 4),
(26, 1),
(26, 2),
(26, 4),
(26, 5),
(26, 6),
(27, 1),
(27, 2),
(27, 5),
(28, 3),
(28, 5),
(29, 1),
(29, 2),
(29, 5),
(30, 1),
(30, 2),
(30, 3),
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(1, 6),
(31, 1),
(31, 2),
(31, 3),
(32, 1),
(32, 3),
(33, 1),
(33, 2),
(33, 3),
(33, 5),
(34, 1),
(34, 2),
(34, 3),
(34, 6),
(35, 5),
(36, 1),
(36, 3),
(36, 4),
(37, 1),
(37, 2),
(37, 3),
(38, 1),
(38, 2),
(38, 3),
(38, 4),
(38, 5),
(38, 7),
(39, 1),
(39, 2),
(40, 1),
(40, 2),
(41, 1),
(41, 2),
(41, 3),
(41, 5),
(42, 1),
(42, 2),
(42, 3),
(42, 5),
(43, 1),
(43, 2),
(43, 5),
(44, 1),
(44, 2),
(44, 3),
(44, 7),
(45, 1),
(45, 2),
(46, 1),
(46, 2),
(46, 3),
(46, 4),
(47, 1),
(47, 2),
(47, 5),
(48, 1),
(48, 2),
(49, 2),
(49, 3),
(49, 5),
(50, 1),
(50, 2),
(50, 4),
(50, 5);

INSERT INTO "public"."habitats" ("id", "name") VALUES
(1, 'Forest'),
(2, 'Savanna'),
(3, 'Shrubland'),
(4, 'Grassland'),
(5, 'Wetlands'),
(6, 'Rocky Areas'),
(7, 'Cave/Subterranean'),
(8, 'Desert'),
(9, 'Marine'),
(10, 'Terrestrial');

INSERT INTO "public"."threats" ("id", "name") VALUES
(1, 'Human Intrusion'),
(2, 'Biological Resource Use'),
(3, 'Invasive Species and Diseases'),
(4, 'Pollution'),
(5, 'Climate Change'),
(6, 'Geological Events'),
(7, 'Others');

INSERT INTO "public"."user_accounts" ("uuid", "name", "email", "password", "country", "is_admin") VALUES
('599725da-8606-4942-a537-4b9644da04c8', 'admin', 'admin@email.com', '$2b$12$hSIMYSQTZMP.tZXF5uGjxu2HHJYRCRQBLPVEwZKH16/65lksdBUby', 'SG', 't'),
('610331cb-5ba3-4343-a55d-18b891b4e3f2', 'pandalover123', 'ilikepandas@email.com', '$2b$12$L/azTZ0BnbsHxgdw0Ll8K.plH8JlpnDQi5tXy61UmyUHew9lghNdi', 'MY', 'f'),
('65aabdb4-1f7f-493b-98f5-01df5c1891c6', 'username', 'username@email.com', '$2b$12$5hXj/2Hiixjvr5TNxFWc2OyNkn8JbH8z1fL8nRYAlaz1J.XnJyRxq', 'SG', 'f'),
('be5f221b-a2bf-48c1-81b5-cfd13d501f13', 'Tasmanian', 'tasmanian@email.com', '$2b$12$OQ7LCgNXTSIuY0dasU5buucHVw67yKmdSVTkPg/05pnkpEDAeCm/.', 'AU', 'f');

INSERT INTO "public"."users_favourites" ("user_id", "animals_id") VALUES
('599725da-8606-4942-a537-4b9644da04c8', 20),
('599725da-8606-4942-a537-4b9644da04c8', 12),
('65aabdb4-1f7f-493b-98f5-01df5c1891c6', 26),
('65aabdb4-1f7f-493b-98f5-01df5c1891c6', 13);

ALTER TABLE "public"."animals_habitats" ADD FOREIGN KEY ("habitats_id") REFERENCES "public"."habitats"("id");
ALTER TABLE "public"."animals_habitats" ADD FOREIGN KEY ("animals_id") REFERENCES "public"."animals"("id");
ALTER TABLE "public"."animals_threats" ADD FOREIGN KEY ("threats_id") REFERENCES "public"."threats"("id");
ALTER TABLE "public"."animals_threats" ADD FOREIGN KEY ("animals_id") REFERENCES "public"."animals"("id");
ALTER TABLE "public"."users_favourites" ADD FOREIGN KEY ("animals_id") REFERENCES "public"."animals"("id");
ALTER TABLE "public"."users_favourites" ADD FOREIGN KEY ("user_id") REFERENCES "public"."user_accounts"("uuid");
