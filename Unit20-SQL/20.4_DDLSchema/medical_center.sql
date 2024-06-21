DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctors(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    contact TEXT
);

CREATE TABLE patients(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT
);

CREATE TABLE doctor_patient(
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE diseases(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    treatment TEXT NOT NULL
);

CREATE TABLE patient_disease(
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    desease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE
);

INSERT INTO doctors (first_name, last_name, specialty, contact) VALUES
('Janet' , 'Smith', 'GP', '+1 250 737 5555'),
('John' , 'Duran', 'Ortopedist', '+1 778 559 5555'),
('Sylvia' , 'Severo', 'Cardiology', '+1 640 133 5555');

INSERT INTO patients (first_name, last_name, phone, address) VALUES
('Marcus','Warn', '+1 586 325 5555','47 Main st');

INSERT INTO doctor_patient (doctor_id,patient_id) VALUES
(1, 1),
(3,1);