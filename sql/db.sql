CREATE TABLE IF NOT EXISTS public.users
(
    id_user int generated always as identity,
    username text NOT NULL,
    email text NOT NULL,
    passwrd text NOT NULL,
    CONSTRAINT id_user_pkey PRIMARY KEY (id_user)
);
CREATE TABLE IF NOT EXISTS public.reg_sismos
(
    id_registro numeric NOT NULL,
    fecha_local timestamp without time zone NOT NULL,
    latitud double precision,
    longitud double precision,
    profundidad integer,
    magnitud double precision,
    ref_geografica text COLLATE pg_catalog."default",
    CONSTRAINT reg_sismo_pkey PRIMARY KEY (id_registro)
);