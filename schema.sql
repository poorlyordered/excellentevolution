--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: AssessmentType; Type: TYPE; Schema: public; Owner: coaching_app_user
--

CREATE TYPE public."AssessmentType" AS ENUM (
    'BIG_FIVE',
    'SIXTEEN_PF',
    'HOLLAND_CODE',
    'DISC',
    'TALENTSMART_EQ',
    'CAREER_VALUES'
);


ALTER TYPE public."AssessmentType" OWNER TO coaching_app_user;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: coaching_app_user
--

CREATE TYPE public."UserRole" AS ENUM (
    'CLIENT',
    'COACH',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO coaching_app_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: coaching_app_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO coaching_app_user;

--
-- Name: assessments; Type: TABLE; Schema: public; Owner: coaching_app_user
--

CREATE TABLE public.assessments (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    type public."AssessmentType" NOT NULL,
    raw_results jsonb NOT NULL,
    processed_insights jsonb NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.assessments OWNER TO coaching_app_user;

--
-- Name: development_plans; Type: TABLE; Schema: public; Owner: coaching_app_user
--

CREATE TABLE public.development_plans (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    title text,
    content text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.development_plans OWNER TO coaching_app_user;

--
-- Name: quarterly_reviews; Type: TABLE; Schema: public; Owner: coaching_app_user
--

CREATE TABLE public.quarterly_reviews (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    review_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.quarterly_reviews OWNER TO coaching_app_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: coaching_app_user
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email text NOT NULL,
    name text,
    role public."UserRole" DEFAULT 'CLIENT'::public."UserRole" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    "hashedPassword" text,
    "avatarUrl" text
);


ALTER TABLE public.users OWNER TO coaching_app_user;

--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (id);


--
-- Name: development_plans development_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.development_plans
    ADD CONSTRAINT development_plans_pkey PRIMARY KEY (id);


--
-- Name: quarterly_reviews quarterly_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.quarterly_reviews
    ADD CONSTRAINT quarterly_reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: assessments_user_id_idx; Type: INDEX; Schema: public; Owner: coaching_app_user
--

CREATE INDEX assessments_user_id_idx ON public.assessments USING btree (user_id);


--
-- Name: development_plans_user_id_idx; Type: INDEX; Schema: public; Owner: coaching_app_user
--

CREATE INDEX development_plans_user_id_idx ON public.development_plans USING btree (user_id);


--
-- Name: quarterly_reviews_user_id_review_date_idx; Type: INDEX; Schema: public; Owner: coaching_app_user
--

CREATE INDEX quarterly_reviews_user_id_review_date_idx ON public.quarterly_reviews USING btree (user_id, review_date);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: coaching_app_user
--

CREATE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: coaching_app_user
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: assessments assessments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: development_plans development_plans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.development_plans
    ADD CONSTRAINT development_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: quarterly_reviews quarterly_reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: coaching_app_user
--

ALTER TABLE ONLY public.quarterly_reviews
    ADD CONSTRAINT quarterly_reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO coaching_app_user;


--
-- PostgreSQL database dump complete
--

