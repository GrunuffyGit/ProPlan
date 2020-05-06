--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    plan_id integer,
    name character varying,
    location character varying,
    coordinates character varying,
    time_start timestamp without time zone,
    time_end timestamp without time zone,
    notes character varying
);


--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plans (
    id integer NOT NULL,
    created_by character varying,
    name character varying,
    description character varying,
    image_url character varying,
    start_date date,
    end_date date
);


--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id character varying NOT NULL,
    name character varying,
    email character varying
);


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.activities (id, plan_id, name, location, coordinates, time_start, time_end, notes) FROM stdin;
4	1	Dancing	\N	\N	2020-02-08 13:00:00	2020-02-08 15:00:00	lunch dance
5	2	Playing Games	\N	\N	2020-02-08 12:00:00	2020-02-08 15:00:00	lunch dance
6	2	Sleeping	\N	\N	2020-02-08 17:00:00	2020-02-08 19:00:00	lunch dance
7	2	Sleeping	\N	\N	2020-02-07 17:00:00	2020-02-07 19:00:00	lunch dance
8	2	Sleeping	\N	\N	2020-02-07 20:00:00	2020-02-07 21:00:00	lunch dance
9	2	Work	\N	\N	2020-02-07 10:00:00	2020-02-07 11:00:00	lunch dance
10	2	Work	\N	\N	2020-02-09 10:00:00	2020-02-09 13:00:00	lunch dance
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.plans (id, created_by, name, description, image_url, start_date, end_date) FROM stdin;
1	fake_id	fake_plan	Updated description	https://data.whicdn.com/images/59987907/original.png	2020-02-07	2020-02-09
2	google-oauth2|110144578242500010668	fake_plan1	No Description	https://data.whicdn.com/images/59987907/original.png	2020-02-07	2020-02-09
3	google-oauth2|110144578242500010668	fake_plan2	Animal Crossing	https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLYYFLfo1vnZx-_T1xADyhUfTxxyAproaNhGli0SjYzD32Wu3E&usqp=CAU	2020-02-07	2020-02-09
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, name, email) FROM stdin;
fake_id	fake_account	fake_email
fake_id2	fake_account2	fake_email2
auth0|5e9f269b07597a0cc7d0fe51	example	example@example.com
google-oauth2|110144578242500010668	gloria.wm.tam	gloria.wm.tam@gmail.com
\.


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.activities_id_seq', 10, true);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.plans_id_seq', 3, true);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: activities activities_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON DELETE CASCADE;


--
-- Name: plans plans_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

